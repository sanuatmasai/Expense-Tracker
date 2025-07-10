// src/services/api.js

import axios from "axios";

const API_BASE = "http://localhost:8000"; // FastAPI backend URL

// ✅ Get all expenses with optional query params (e.g., date range)
export const getExpenses = (params) =>
  axios.get(`${API_BASE}/expenses`, { params });

// ✅ Create a new expense
export const createExpense = (data) =>
  axios.post(`${API_BASE}/expenses`, data);

// ✅ Delete an expense
export const deleteExpense = (id) =>
  axios.delete(`${API_BASE}/expenses/${id}`);

// ✅ Update an existing expense
export const updateExpense = (id, data) =>
  axios.put(`${API_BASE}/expenses/${id}`, data); // ← This was missing

// ✅ Get total + category breakdown
export const getSummary = () =>
  axios.get(`${API_BASE}/expenses/total`);
