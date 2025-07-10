// src/components/ExpenseForm.jsx

import React, { useState, useEffect } from "react";
import { createExpense } from "../services/api";
import { updateExpense } from "../services/api";

const categories = ["Food", "Transport", "Rent", "Utilities", "Other"];

const ExpenseForm = ({ onAdd, editingExpense, setEditingExpense }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (editingExpense) {
      setForm(editingExpense);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, form);
        setEditingExpense(null);
      } else {
        await createExpense(form);
      }

      onAdd();
      setForm({ title: "", amount: "", category: "", date: "" });
    } catch (err) {
      alert("Failed to save expense");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Title"
            required
          />
        </div>
        <div className="col">
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="form-control"
            placeholder="Amount"
            required
          />
        </div>
        <div className="col">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col">
          <button className="btn btn-success w-100">
            {editingExpense ? "Update" : "Add"}
          </button>
        </div>
        {editingExpense && (
          <div className="col">
            <button
              className="btn btn-secondary w-100"
              onClick={() => setEditingExpense(null)}
              type="button"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
