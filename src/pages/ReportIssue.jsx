import { useState } from "react";
import { useIssues } from "../context/IssueContext";

function ReportIssue() {
  const { issues, addIssue } = useIssues();

  const user = JSON.parse(localStorage.getItem("auth"));

  const userIssues = issues.filter(
    (issue) => issue.submittedBy === user?.username
  );

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !location || !description) {
      alert("Please fill all fields");
      return;
    }

    const newIssue = {
      id: Date.now(),
      title,
      location,
      description,
      submittedBy: user?.username,
      status: "Pending",
    };

    addIssue(newIssue);

    setTitle("");
    setLocation("");
    setDescription("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "In Progress":
        return "bg-blue-500";
      case "Resolved":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Report Issue</h1>

      {/* Issue Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-10"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Issue Title"
            className="p-3 rounded bg-slate-800 border border-slate-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="p-3 rounded bg-slate-800 border border-slate-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Describe the issue..."
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 mb-6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="bg-cyan-500 px-6 py-2 rounded hover:bg-cyan-600 transition"
        >
          Submit Issue
        </button>
      </form>

      {/* Previous Reports Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Your Previous Reports ({userIssues.length})
        </h2>

        {userIssues.length === 0 ? (
          <p className="text-slate-400">
            You have not submitted any issues yet.
          </p>
        ) : (
          <div className="space-y-4">
            {userIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-slate-900 p-6 rounded-xl border border-slate-800"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-cyan-400">
                    {issue.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${getStatusColor(
                      issue.status
                    )}`}
                  >
                    {issue.status}
                  </span>
                </div>

                <p className="text-slate-400 mb-2">
                  Location: {issue.location}
                </p>

                <p className="text-slate-300 text-sm">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportIssue;