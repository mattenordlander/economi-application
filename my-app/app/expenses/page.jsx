"use client";
import { useState } from "react";
import expensesData from "../../data/mock-expenses.json";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(expensesData);
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);

  function addExpense() {
    const newExpense = {
      id: Date.now(),
      amount,
      category: "Övrigt",
      date: new Date().toISOString().slice(0, 10),
    };
    setExpenses([...expenses, newExpense]);
    setAmount("");
  }

  function startEditing(id, currentAmount) {
    setEditingId(id);
    setAmount(currentAmount);
  }

  function saveEdit(id) {
    const updated = expenses.map((e) => (e.id === id ? { ...e, amount } : e));
    setExpenses(updated);
    setEditingId(null);
    setAmount("");
  }

  function cancelEdit() {
    setEditingId(null);
    setAmount("");
  }

  return (
    <div style={{ padding: "3rem" }}>
      <h1>Utgifter</h1>

      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.date} — {e.category}: {e.amount} kr
            {editingId === e.id ? (
              <>
                <input
                  type="number"
                  value={amount}
                  onChange={(ev) => setAmount(ev.target.value)}
                />
                <button onClick={() => saveEdit(e.id)}>Spara</button>
                <button onClick={cancelEdit}>Avbryt</button>
              </>
            ) : (
              <button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #bfbcbcff",
                  padding: "4px 8px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => startEditing(e.id, e.amount)}
              >
                Redigera
              </button>
            )}
          </li>
        ))}
      </ul>

      <hr />

      <h2>Lägg till ny</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Belopp"
      />
      <button onClick={addExpense}>Lägg till</button>
    </div>
  );
}
