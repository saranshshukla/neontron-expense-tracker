import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import { Trash2 } from 'lucide-react';

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadFromLocalStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

function exportToCSV(data) {
  if (!data.length) return;
  const header = Object.keys(data[0]);
  const csvRows = data.map(row =>
    header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
  );
  const csvData = [header.join(','), ...csvRows].join('\r\n');
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'expenses.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}
function replacer(key, value) {
  return value === null ? '' : value;
}

export default function ExpenseTracker() {
  // Expenses with date for charting
  const [expenses, setExpenses] = useState(() =>
    loadFromLocalStorage('expenses', []).map(exp => ({
      ...exp,
      date: exp.date || new Date().toISOString().slice(0, 10),
    }))
  );
  const [expenseInput, setExpenseInput] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10));

  const [activeCalc, setActiveCalc] = useState('tracker');

  useEffect(() => {
    saveToLocalStorage('expenses', expenses);
  }, [expenses]);

  const addExpense = () => {
    if (!expenseInput || !expenseAmount) return;
    const newExpense = {
      id: Date.now(),
      name: expenseInput,
      amount: parseFloat(expenseAmount),
      date: expenseDate,
    };
    setExpenses([...expenses, newExpense]);
    setExpenseInput('');
    setExpenseAmount('');
    setExpenseDate(new Date().toISOString().slice(0, 10));
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Group expenses by date for chart
  const expensesByDate = expenses.reduce((acc, exp) => {
    acc[exp.date] = (acc[exp.date] || 0) + exp.amount;
    return acc;
  }, {});
  const chartData = Object.entries(expensesByDate)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, amount]) => ({ date, amount }));

    const deleteExpense = (id) => {
    const filtered = expenses.filter((exp) => exp.id !== id);
    setExpenses(filtered);
  };

  // Savings Calculator state & localStorage
  const [monthlySaving, setMonthlySaving] = useState(() => loadFromLocalStorage('monthlySaving', ''));
  const [savingInterest, setSavingInterest] = useState(() => loadFromLocalStorage('savingInterest', ''));
  const [savingYears, setSavingYears] = useState(() => loadFromLocalStorage('savingYears', ''));
  const [savingResult, setSavingResult] = useState(null);

  useEffect(() => saveToLocalStorage('monthlySaving', monthlySaving), [monthlySaving]);
  useEffect(() => saveToLocalStorage('savingInterest', savingInterest), [savingInterest]);
  useEffect(() => saveToLocalStorage('savingYears', savingYears), [savingYears]);

  const calculateSavings = () => {
    const P = parseFloat(monthlySaving);
    const r = parseFloat(savingInterest) / 100 / 12;
    const n = parseInt(savingYears) * 12;
    if (isNaN(P) || isNaN(r) || isNaN(n) || r === 0) {
      setSavingResult(null);
      return;
    }
    const FV = P * ((Math.pow(1 + r, n) - 1) / r);
    setSavingResult(FV.toFixed(2));
  };

  // SIP Calculator state & localStorage
  const [sipAmount, setSipAmount] = useState(() => loadFromLocalStorage('sipAmount', ''));
  const [sipReturnRate, setSipReturnRate] = useState(() => loadFromLocalStorage('sipReturnRate', ''));
  const [sipYears, setSipYears] = useState(() => loadFromLocalStorage('sipYears', ''));
  const [sipResult, setSipResult] = useState(null);

  useEffect(() => saveToLocalStorage('sipAmount', sipAmount), [sipAmount]);
  useEffect(() => saveToLocalStorage('sipReturnRate', sipReturnRate), [sipReturnRate]);
  useEffect(() => saveToLocalStorage('sipYears', sipYears), [sipYears]);

  const calculateSIP = () => {
    const P = parseFloat(sipAmount);
    const r = parseFloat(sipReturnRate) / 100 / 12;
    const n = parseInt(sipYears) * 12;
    if (isNaN(P) || isNaN(r) || isNaN(n)) {
      setSipResult(null);
      return;
    }
    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setSipResult(FV.toFixed(2));
  };

  // Loan EMI Calculator
  const [loanAmount, setLoanAmount] = useState(() => loadFromLocalStorage('loanAmount', ''));
  const [loanRate, setLoanRate] = useState(() => loadFromLocalStorage('loanRate', ''));
  const [loanYears, setLoanYears] = useState(() => loadFromLocalStorage('loanYears', ''));
  const [emiResult, setEmiResult] = useState(null);

  useEffect(() => saveToLocalStorage('loanAmount', loanAmount), [loanAmount]);
  useEffect(() => saveToLocalStorage('loanRate', loanRate), [loanRate]);
  useEffect(() => saveToLocalStorage('loanYears', loanYears), [loanYears]);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(loanRate) / 100 / 12;
    const n = parseInt(loanYears) * 12;
    if (isNaN(P) || isNaN(r) || isNaN(n) || r === 0) {
      setEmiResult(null);
      return;
    }
    const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiResult(EMI.toFixed(2));
  };

  // Retirement Planner Calculator
  const [currentAge, setCurrentAge] = useState(() => loadFromLocalStorage('currentAge', ''));
  const [retirementAge, setRetirementAge] = useState(() => loadFromLocalStorage('retirementAge', ''));
  const [monthlyInvestment, setMonthlyInvestment] = useState(() => loadFromLocalStorage('monthlyInvestment', ''));
  const [expectedReturn, setExpectedReturn] = useState(() => loadFromLocalStorage('expectedReturn', ''));
  const [retirementCorpus, setRetirementCorpus] = useState(null);

  useEffect(() => saveToLocalStorage('currentAge', currentAge), [currentAge]);
  useEffect(() => saveToLocalStorage('retirementAge', retirementAge), [retirementAge]);
  useEffect(() => saveToLocalStorage('monthlyInvestment', monthlyInvestment), [monthlyInvestment]);
  useEffect(() => saveToLocalStorage('expectedReturn', expectedReturn), [expectedReturn]);

  const calculateRetirement = () => {
    const ageNow = parseInt(currentAge);
    const retireAt = parseInt(retirementAge);
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = (retireAt - ageNow) * 12;
    if (isNaN(ageNow) || isNaN(retireAt) || isNaN(P) || isNaN(r) || isNaN(n) || n <= 0) {
      setRetirementCorpus(null);
      return;
    }
    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setRetirementCorpus(FV.toFixed(2));
  };

  // Generate PDF report of expenses
  const generatePDF = () => {
    if (!expenses.length) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Expense Report', 14, 22);
    doc.setFontSize(12);
    let y = 30;
    expenses.forEach(({ name, amount, date }) => {
      doc.text(`${date}: ${name} - ₹${amount.toFixed(2)}`, 14, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
    doc.setFontSize(14);
    doc.text(`Total Expenses: ₹${totalExpense.toFixed(2)}`, 14, y + 10);
    doc.save('Expense_Report.pdf');
  };

  return (
    <div className="glass-card max-w-4xl mx-auto p-4 overflow-auto
 bg-black bg-opacity-60 rounded-xl shadow-lg text-neon font-mono">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {['tracker', 'savings', 'sip', 'loan', 'retirement'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              activeCalc === tab
                ? 'bg-neon text-black shadow-neon-glow'
                : 'bg-transparent border border-neon text-neon hover:bg-neon hover:text-black'
            } neumorphic-btn`}
            onClick={() => setActiveCalc(tab)}
          >
            {tab === 'tracker'
              ? 'Expense Tracker'
              : tab === 'savings'
              ? 'Savings Calculator'
              : tab === 'sip'
              ? 'SIP Calculator'
              : tab === 'loan'
              ? 'Loan EMI Calculator'
              : 'Retirement Planner'}
          </button>
        ))}
      </div>

      {/* Animate presence for smooth transitions */}
      <AnimatePresence mode="wait">
        {activeCalc === 'tracker' && (
          <motion.div
            key="tracker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl mb-4 neon-glow">Track Your Expenses</h2>
            <div className="flex flex-col sm:flex-row sm:space-x-2 mb-4 gap-2">
              <input
                type="text"
                placeholder="Expense name"
                value={expenseInput}
                onChange={(e) => setExpenseInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-28 px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-36 px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <button
                onClick={addExpense}
                className="px-4 py-2 bg-neon text-black rounded-md font-semibold hover:bg-cyan-400 transition neumorphic-btn"
              >
                Add
              </button>
            </div>
            <ul className="mb-4 max-h-40 overflow-y-auto border border-neon rounded-md p-2">
  {expenses.length === 0 && (
    <li className="text-neon opacity-50">No expenses yet.</li>
  )}
  {expenses.map(({ id, name, amount, date }) => (
    <li
      key={id}
      className="flex justify-between items-center border-b border-neon py-1 last:border-none"
    >
      <span>
        {date} - {name}
      </span>
      <div className="flex items-center gap-3">
        <span>₹ {amount.toFixed(2)}</span>
        <button
          onClick={() => deleteExpense(id)}
          className="text-red-400 hover:text-red-600 transition"
          title="Delete expense"
        >
          <Trash2 size={16} />
          
        </button>
      </div>
    </li>
  ))}
</ul>

            <div className="text-lg font-semibold neon-glow mb-4">
              Total Expenses: ₹ {totalExpense.toFixed(2)}
            </div>
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => exportToCSV(expenses)}
                className="px-4 py-2 bg-neon text-black rounded-md font-semibold hover:bg-cyan-400 transition neumorphic-btn"
                disabled={expenses.length === 0}
                title={expenses.length === 0 ? 'No data to export' : 'Export expenses as CSV'}
              >
                Export CSV
              </button>
              <button
                onClick={() => {
                  if (expenses.length === 0) return;
                  const blob = new Blob([JSON.stringify(expenses, null, 2)], {
                    type: 'application/json',
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'expenses.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-neon text-black rounded-md font-semibold hover:bg-cyan-400 transition neumorphic-btn"
                disabled={expenses.length === 0}
                title={expenses.length === 0 ? 'No data to export' : 'Export expenses as JSON'}
              >
                Export JSON
              </button>
              <button
                onClick={generatePDF}
                className="px-4 py-2 bg-neon text-black rounded-md font-semibold hover:bg-cyan-400 transition neumorphic-btn"
                disabled={expenses.length === 0}
                title={expenses.length === 0 ? 'No data to export' : 'Download PDF Report'}
              >
                Download PDF
              </button>
            </div>

            {/* Expense Chart */}
            <div className="w-full h-64 border border-neon rounded-md p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00fff7" />
                  <XAxis
                    dataKey="date"
                    stroke="#00fff7"
                    tick={{ fill: '#00fff7', fontSize: 12 }}
                    tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()}
                  />
                  <YAxis stroke="#00fff7" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000', borderColor: '#00fff7' }}
                    labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                    formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#00fff7"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Savings Calculator */}
        {activeCalc === 'savings' && (
          <motion.div
            key="savings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl mb-4 neon-glow">Savings Calculator</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Monthly Saving Amount (₹)"
                value={monthlySaving}
                onChange={(e) => setMonthlySaving(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Expected Annual Interest Rate (%)"
                value={savingInterest}
                onChange={(e) => setSavingInterest(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Duration (Years)"
                value={savingYears}
                onChange={(e) => setSavingYears(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <button
                onClick={calculateSavings}
                className="w-full py-2 bg-neon text-black rounded-md font-semibold hover:bg-cyan-400 transition neumorphic-btn"
              >
                Calculate
              </button>
              {savingResult && (
                <div className="mt-4 text-lg font-semibold neon-glow">
                  Future Value: ₹ {savingResult}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* SIP Calculator */}
        {activeCalc === 'sip' && (
          <motion.div
            key="sip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl mb-4 neon-glow">SIP Calculator</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Monthly SIP Amount (₹)"
                value={sipAmount}
                onChange={(e) => setSipAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Expected Annual Return Rate (%)"
                value={sipReturnRate}
                onChange={(e) => setSipReturnRate(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Duration (Years)"
                value={sipYears}
                onChange={(e) => setSipYears(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <button
                onClick={calculateSIP}
                className="w-full py-2 bg-neon text-black rounded-md font-semibold hover:bg-cyan-400 transition neumorphic-btn"
              >
                Calculate
              </button>
              {sipResult && (
                <div className="mt-4 text-lg font-semibold neon-glow">
                  Future Value: ₹ {sipResult}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Loan EMI Calculator */}
        {activeCalc === 'loan' && (
          <motion.div
            key="loan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl mb-4 neon-glow">Loan EMI Calculator</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Loan Amount (₹)"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Annual Interest Rate (%)"
                value={loanRate}
                onChange={(e) => setLoanRate(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Loan Tenure (Years)"
                value={loanYears}
                onChange={(e) => setLoanYears(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <button
                onClick={calculateEMI}
                className="w-full py-2 bg-neon text-black rounded-md font-semibold hover:bg-cyan-400 transition neumorphic-btn"
              >
                Calculate
              </button>
              {emiResult && (
                <div className="mt-4 text-lg font-semibold neon-glow">
                  Monthly EMI: ₹ {emiResult}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Retirement Planner */}
        {activeCalc === 'retirement' && (
          <motion.div
            key="retirement"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl mb-4 neon-glow">Retirement Planner</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Current Age"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Planned Retirement Age"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Monthly Investment Amount (₹)"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <input
                type="number"
                placeholder="Expected Annual Return Rate (%)"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black bg-opacity-50 border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
              />
              <button
                onClick={calculateRetirement}
                className="w-full py-2 bg-neon text-black rounded-md font-semibold hover:bg-cyan-400 transition neumorphic-btn"
              >
                Calculate
              </button>
              {retirementCorpus && (
                <div className="mt-4 text-lg font-semibold neon-glow">
                  Estimated Retirement Corpus: ₹ {retirementCorpus}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
