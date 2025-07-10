// src/components/ExpenseTable.jsx

import React, { useState, useEffect } from "react";
import { getExpenses, deleteExpense } from "../services/api";

const categories = ["All", "Food", "Transport", "Rent", "Utilities", "Other"];

const ExpenseTable = ({ refresh, onEdit }) => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchExpenses = async () => {
    try {
      const params = {};
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;

      const res = await getExpenses(params);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh, startDate, endDate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await deleteExpense(id);
    fetchExpenses();
  };

  const filtered = filter === "All"
    ? expenses
    : expenses.filter((e) => e.category === filter);

  return (
    <div>
      <div className="row mb-2 g-2 align-items-end">
        <div className="col-auto">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <label>Category</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount ($)</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((exp) => (
            <tr key={exp.id}>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>{exp.title}</td>
              <td>{exp.amount.toFixed(2)}</td>
              <td>{exp.category}</td>
              <td>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="btn btn-sm btn-danger"
                >
                  ✕
                </button>
                <button
                  onClick={() => onEdit(exp)}
                  className="btn btn-sm btn-warning me-2"
                >
                  ✎
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
