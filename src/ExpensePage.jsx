// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App
// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { motion } from "framer-motion";
// import { PlusCircle, Trash2, LayoutDashboard, LogOut, Wallet } from "lucide-react";

// export default function App() {
//   const [expenses, setExpenses] = useState([
//     { id: 1, category: "Shopping", amount: 430, date: "2025-02-17" },
//     { id: 2, category: "Electricity Bill", amount: 200, date: "2025-02-11" },
//     { id: 3, category: "Travel", amount: 670, date: "2025-02-13" },
//     { id: 4, category: "Loan Repayment", amount: 600, date: "2025-02-10" },
//   ]);

//   const [form, setForm] = useState({ category: "", amount: "", date: "" });

//   const addExpense = (e) => {
//     e.preventDefault();
//     if (!form.category || !form.amount || !form.date) return;
//     setExpenses([...expenses, { ...form, id: Date.now(), amount: Number(form.amount) }]);
//     setForm({ category: "", amount: "", date: "" });
//   };

//   const deleteExpense = (id) => setExpenses(expenses.filter((exp) => exp.id !== id));

//   const chartData = expenses.map((exp) => ({
//     name: exp.category,
//     amount: exp.amount,
//   }));

//   return (
//     <div className="page">
//       {/* ===== SIDEBAR ===== */}
//       <aside className="sidebar">
//         <div className="profile">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//             alt="user"
//             className="avatar"
//           />
//           <h2 className="username">Mike William</h2>
//         </div>

//         <nav className="menu">
//           <div className="menu-item">
//             <LayoutDashboard size={18} />
//             <span>Dashboard</span>
//           </div>
//           <div className="menu-item">
//             <Wallet size={18} />
//             <span>Income</span>
//           </div>
//           <div className="menu-item active">
//             <Wallet size={18} />
//             <span>Expense</span>
//           </div>
//           <div className="menu-item logout">
//             <LogOut size={18} />
//             <span>Logout</span>
//           </div>
//         </nav>
//       </aside>

//       {/* ===== MAIN CONTENT ===== */}
//       <main className="main">
//         <header className="header">
//           <h1>Expense Tracker</h1>
//         </header>

//         {/* ==== Chart Section ==== */}
//         <section className="card chart-card">
//           <h2>Expense Overview</h2>
//           <div className="chart-wrap">
//             <ResponsiveContainer width="100%" height={280}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#093b2b" />
//                 <XAxis dataKey="name" stroke="#8ee0b1" />
//                 <YAxis stroke="#8ee0b1" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#042e23",
//                     borderRadius: 8,
//                     border: "none",
//                     color: "#8ee0b1",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="amount"
//                   stroke="#22c55e"
//                   strokeWidth={3}
//                   dot={{ r: 5 }}
//                   activeDot={{ r: 7 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </section>

//         {/* ==== Add Form ==== */}
//         <section className="card form-card">
//           <form className="add-form" onSubmit={addExpense}>
//             <input
//               placeholder="Category"
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={form.amount}
//               onChange={(e) => setForm({ ...form, amount: e.target.value })}
//             />
//             <input
//               type="date"
//               placeholder="Date"
//               value={form.date}
//               onChange={(e) => setForm({ ...form, date: e.target.value })}
//             />
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               type="submit"
//               className="btn"
//             >
//               <PlusCircle size={16} /> Add Expense
//             </motion.button>
//           </form>
//         </section>

//         {/* ==== List Section ==== */}
//         <section className="card list-card">
//           <h3>All Expenses</h3>
//           <div className="expenses-list">
//             {expenses.map((exp) => (
//               <motion.div
//                 key={exp.id}
//                 className="expense-row"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 <div className="left">
//                   <div className="cat">{exp.category}</div>
//                   <div className="date">{exp.date}</div>
//                 </div>
//                 <div className="right">
//                   <div className="amount">- ₹{exp.amount}</div>
//                   <button className="icon-btn" onClick={() => deleteExpense(exp.id)}>
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, LayoutDashboard, LogOut, Wallet, SidebarCloseIcon } from "lucide-react";
import "./ExpensePage.css";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Shopping", amount: 430, date: "2025-02-17" },
    { id: 2, category: "Electricity Bill", amount: 200, date: "2025-02-11" },
    { id: 3, category: "Travel", amount: 670, date: "2025-02-13" },
    { id: 4, category: "Loan Repayment", amount: 600, date: "2025-02-10" },
  ]);

  const [form, setForm] = useState({ category: "", amount: "", date: "" });
  const [sidebarOpen, setSidebarOpen] = useState(true); // new state

  const addExpense = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.date) return;
    setExpenses([...expenses, { ...form, id: Date.now(), amount: Number(form.amount) }]);
    setForm({ category: "", amount: "", date: "" });
  };

  const deleteExpense = (id) => setExpenses(expenses.filter((exp) => exp.id !== id));

  const chartData = expenses.map((exp) => ({
    name: exp.category,
    amount: exp.amount,
  }));

  return (
    <div className="page">

      {/* ===== MAIN CONTENT ===== */}
      <main className="main">
        {/* Toggle Button */}
        <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "Close" : "Menu"}
        </button>

        <header className="header">
          <h1>Expense Tracker</h1>
        </header>

        <section className="card chart-card">
          <h2>Expense Overview</h2>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#093b2b" />
                <XAxis dataKey="name" stroke="#8ee0b1" />
                <YAxis stroke="#8ee0b1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#042e23",
                    borderRadius: 8,
                    border: "none",
                    color: "#8ee0b1",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        
        <section className="card list-card">
            <section className="card form-card">
          <form className="add-form" onSubmit={addExpense}>
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn"
            >
              <PlusCircle size={16} /> Add Expense
            </motion.button>
          </form>
        </section>

          <h3>All Expenses</h3>
          <div className="expenses-list">
            {expenses.map((exp) => (
              <motion.div
                key={exp.id}
                className="expense-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="left">
                  <div className="cat">{exp.category}</div>
                  <div className="date">{exp.date}</div>
                </div>
                <div className="right">
                  <div className="amount">- ₹{exp.amount}</div>
                  <button className="icon-btn" onClick={() => deleteExpense(exp.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}