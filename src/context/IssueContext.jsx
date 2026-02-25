import { createContext, useContext, useEffect, useState } from "react";

const IssueContext = createContext();

export function IssueProvider({ children }) {
 const [issues, setIssues] = useState(() => {
  const storedIssues = localStorage.getItem("issues");
  return storedIssues ? JSON.parse(storedIssues) : [];
});

  // Load issues from localStorage
  useEffect(() => {
    const storedIssues = localStorage.getItem("issues");
    if (storedIssues) {
      setIssues(JSON.parse(storedIssues));
    }
  }, []);

  // Save issues whenever updated
  useEffect(() => {
    localStorage.setItem("issues", JSON.stringify(issues));
  }, [issues]);

  const addIssue = (issue) => {
    setIssues((prev) => [...prev, issue]);
  };

  const updateIssueStatus = (id, status) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, status } : issue
      )
    );
  };

  return (
    <IssueContext.Provider value={{ issues, addIssue, updateIssueStatus }}>
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  return useContext(IssueContext);
}