import React, { useState } from "react";
import "./IncomePage.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Briefcase, Laptop, ShoppingBag, TrendingUp, Coins } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomePage = () => {
  const [incomeList] = useState([
    { id: 1, title: "Salary", amount: 12000, date: "2025-02-12", category: "Job", icon: <Briefcase /> },
    { id: 2, title: "Freelancing", amount: 5000, date: "2025-02-16", category: "Work", icon: <Laptop /> },
    { id: 3, title: "E-commerce Sales", amount: 11900, date: "2025-01-11", category: "Business", icon: <ShoppingBag /> },
    { id: 4, title: "Affiliate Marketing", amount: 8000, date: "2025-01-09", category: "Online", icon: <TrendingUp /> },
    { id: 5, title: "Stock Market", amount: 9200, date: "2025-01-06", category: "Investment", icon: <Coins /> },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const filteredIncome = incomeList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? item.category === category : true;
    const matchesDate =
      (!dateRange.start || new Date(item.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(item.date) <= new Date(dateRange.end));
    return matchesSearch && matchesCategory && matchesDate;
  });

  const chartData = {
    labels: incomeList.map((item) => item.title),
    datasets: [
      {
        label: "Income Amount ($)",
        data: incomeList.map((item) => item.amount),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(0,255,180,0.8)");
          gradient.addColorStop(1, "rgba(0,100,60,0.1)");
          return gradient;
        },
        borderColor: "#00ffaa",
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Income Overview",
        color: "#bfffe0",
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: "#bfffe0" }, grid: { color: "rgba(0,255,153,0.05)" } },
      y: { ticks: { color: "#bfffe0" }, grid: { color: "rgba(0,255,153,0.05)" } },
    },
  };

  return (
    <div className="income-page">
      <h1 className="page-title">Income Tracker</h1>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search income..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Job">Job</option>
          <option value="Work">Work</option>
          <option value="Business">Business</option>
          <option value="Online">Online</option>
          <option value="Investment">Investment</option>
        </select>

        <div className="date-range">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
          <span>—</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Income List */}
      <div className="income-list">
        {filteredIncome.map((item) => (
          <div className="income-card" key={item.id}>
            <div className="icon">{item.icon}</div>
            <div className="details">
              <h3>{item.title}</h3>
              <p>{item.category} • {new Date(item.date).toDateString()}</p>
            </div>
            <div className="amount">+${item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomePage;