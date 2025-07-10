// src/App.jsx

import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import Summary from "./components/Summary";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const refresh = () => setRefreshFlag(!refreshFlag);

  return (
    <div className="container py-4">
      <h2 className="mb-4">💸 Expense Tracker</h2>
      <ExpenseForm
        onAdd={refresh}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />
      <Summary refresh={refreshFlag} />
      <ExpenseTable
        refresh={refreshFlag}
        onEdit={setEditingExpense}
      />
    </div>
  );
}

export default App;
