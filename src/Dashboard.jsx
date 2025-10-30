import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";
import "./Dashboard.css";
import { incomeData as INCOME_DATA, expenseData as EXPENSE_DATA } from "./financeData";

// colors for chart and legend
const COLORS = ["#00b37e", "#4affb0", "#aaffcc", "#007a55"];

const quotes = [
  "A budget is telling your money where to go instead of wondering where it went.",
  "Do not save what is left after spending, but spend what is left after saving.",
  "The key to financial freedom is planning and discipline.",
  "Invest in your future self — small steps make a big difference.",
];

// Recent activities will be built from financeData below

const incomeDetails = [
  { label: "Company A - Sep", amount: "₹20,000" },
  { label: "Bonus - Aug", amount: "₹5,000" },
];

const expenseDetails = [
  { label: "Food & Dining", amount: "₹3,000" },
  { label: "Utilities", amount: "₹1,500" },
];

// ===== Dashboard Component =====
const Dashboard = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  // Build totals from financeData
  const totalIncome = INCOME_DATA.reduce((sum, g) => sum + (g.total || 0), 0);
  const totalExpenses = EXPENSE_DATA.reduce((sum, g) => sum + (g.total || 0), 0);
  const savings = totalIncome - totalExpenses;

  // Build pie data from expense groups
  const pieData = EXPENSE_DATA.map((g) => ({ name: g.category, value: g.total }));

  // Build recent transactions list (merge income and expense items)
  const recent = [
    ...INCOME_DATA.flatMap((g) => (g.items || []).map((it) => ({ ...it, type: "inc" }))),
    ...EXPENSE_DATA.flatMap((g) => (g.items || []).map((it) => ({ ...it, type: "exp" }))),
  ]
    .map((t) => ({ ...t, date: t.date || null }))
    .sort((a, b) => (b.date || "") .localeCompare(a.date || ""))
    .slice(0, 8);

  // Auto-slide quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (n) => {
    try {
      return new Intl.NumberFormat("en-IN").format(n);
    } catch (e) {
      return n;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-page">
      {/* ===== Summary Cards ===== */}
      <div className="summary-cards">
        <div className="card">
          <h4>Total Income</h4>
          <div className="amount">₹{fmt(totalIncome)}</div>
        </div>
        <div className="card">
          <h4>Total Expenses</h4>
          <div className="amount">₹{fmt(totalExpenses)}</div>
        </div>
        <div className="card">
          <h4>Savings</h4>
          <div className="amount">₹{fmt(savings)}</div>
        </div>
      </div>

      {/* ===== Charts & Quotes Section ===== */}
      <div className="chart-row">
        {/* ===== Donut Chart ===== */}
        <div className="donut-wrap">
          <h3>Expense Breakdown</h3>
          <div className="donut">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-center">
              <div className="center-amount">₹{fmt(savings)}</div>
              <div className="muted">Saved</div>
            </div>
          </div>

          {/* Legend (summary) */}
          <ul className="legend-list">
            <li>
              <span className="legend-dot" style={{ background: COLORS[0] }}></span>
              Income: ₹{fmt(totalIncome)}
            </li>
            <li>
              <span className="legend-dot" style={{ background: COLORS[1] }}></span>
              Expenses: ₹{fmt(totalExpenses)}
            </li>
            <li>
              <span className="legend-dot" style={{ background: COLORS[2] }}></span>
              Savings: ₹{fmt(savings)}
            </li>
          </ul>
        </div>

        {/* ===== Quotes & Recent Activities ===== */}
        <div className="quotes-wrap">
          {/* Quotes */}
          <div className="quote-box">
            <p className="quote-text animate-quote">{quotes[quoteIndex]}</p>
          </div>

          {/* Recent Activities */}
          <div className="recent-activities">
            <h4>Recent Transactions</h4>
            <ul>
              {recent.map((act, index) => (
                <li key={index}>
                  <span className={`mini-type ${act.type}`}>
                    {act.type === "inc" ? "+" : "–"}
                  </span>
                  <span>{act.label || act.text}</span>
                  <span className="muted">₹{fmt(act.amount)} {act.date ? ` ${act.date}` : ""}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Expandable Income & Expense Lists ===== */}
      <div className="chart-card">
        {/* Income */}
        <div className="expand-card">
          <div className="expand-header">
            <h4>Income Details</h4>
            <ChevronDown className="chev" />
          </div>
          <div className="expand-body">
            {INCOME_DATA.flatMap((g) => g.items || []).map((item, index) => (
              <div className="tx" key={index}>
                <span>{item.label}</span>
                <span>₹{fmt(item.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses */}
        <div className="expand-card">
          <div className="expand-header">
            <h4>Expenses</h4>
            <ChevronDown className="chev" />
          </div>
          <div className="expand-body">
            {EXPENSE_DATA.flatMap((g) => g.items || []).map((item, index) => (
              <div className="tx" key={index}>
                <span>{item.label}</span>
                <span>₹{fmt(item.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
