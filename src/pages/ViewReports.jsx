import { useState } from "react";
import { useIssues } from "../context/IssueContext";

function ViewReports() {
  const { issues, updateIssueStatus } = useIssues();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Analytics Counts
  const total = issues.length;
  const pending = issues.filter(i => i.status === "Pending").length;
  const progress = issues.filter(i => i.status === "In Progress").length;
  const resolved = issues.filter(i => i.status === "Resolved").length;

  // Filtering + Search
  const filteredIssues = issues
    .filter(issue => (filter === "All" ? true : issue.status === filter))
    .filter(issue =>
      issue.title.toLowerCase().includes(search.toLowerCase())
    );

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
      <h1 className="text-3xl font-bold mb-8">View Reports</h1>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p className="text-slate-400">Total Issues</p>
          <h2 className="text-3xl font-bold text-white">{total}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p className="text-slate-400">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-400">{pending}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p className="text-slate-400">In Progress</p>
          <h2 className="text-3xl font-bold text-blue-400">{progress}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p className="text-slate-400">Resolved</p>
          <h2 className="text-3xl font-bold text-green-400">{resolved}</h2>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 rounded bg-slate-900 border border-slate-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 rounded bg-slate-900 border border-slate-700"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-slate-400 text-sm">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Submitted By</th>
              <th className="p-4">Status</th>
              <th className="p-4">Change Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredIssues.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">
                  No issues found.
                </td>
              </tr>
            ) : (
              filteredIssues.map((issue) => (
                <tr
                  key={issue.id}
                  className="border-t border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="p-4">{issue.title}</td>
                  <td className="p-4">{issue.location}</td>
                  <td className="p-4">{issue.submittedBy}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${getStatusColor(issue.status)}`}
                    >
                      {issue.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={issue.status}
                      onChange={(e) =>
                        updateIssueStatus(issue.id, e.target.value)
                      }
                      className="bg-slate-800 border border-slate-700 rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ViewReports;