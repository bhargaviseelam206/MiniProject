import React, { useState } from "react";

const IssueReport = ({ donationId, onClose }) => {
  const [issue, setIssue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the issue reporting logic (e.g., send to server)
    console.log(`Reporting issue for donation ${donationId}:`, issue);
    onClose(); // Close the form after submission
  };

  return (
    <div className="issue-report-form">
      <h3>Report an Issue</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Describe the issue..."
        ></textarea>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default IssueReport;
