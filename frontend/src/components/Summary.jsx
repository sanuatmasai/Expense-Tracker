// src/components/Summary.jsx

import React, { useEffect, useState } from "react";
import { getSummary } from "../services/api";

const Summary = ({ refresh }) => {
  const [summary, setSummary] = useState({ total: 0, breakdown: {} });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getSummary();
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    };

    fetchSummary();
  }, [refresh]);

  return (
    <div className="card p-3 mb-4">
      <h5>Total Spent: ${summary.total.toFixed(2)}</h5>
      <ul className="mb-0">
        {Object.entries(summary.breakdown).map(([cat, amt]) => (
          <li key={cat}>{cat}: ${amt.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
