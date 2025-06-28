// src/components/Articles.jsx
import React from 'react';
import Chart from './Chart';
import { motion } from 'framer-motion';

export default function Articles() {
  const articles = [
    {
      title: 'Understanding Expense Tracking: The Foundation of Financial Clarity',
      paragraphs: [
        `Expense tracking is the bedrock of sound personal finance. By cataloging every rupee spent—be it your morning chai or monthly rent—you unveil hidden spending patterns. Awareness breeds control: when you see that impulsive online purchase habit costing ₹5,000 monthly, you can decide whether that joy is worth the drain on your savings.`,
        `Consider launching a simple spreadsheet or a mobile app at day’s end. Record date, category, amount, and a brief note. Over a month, color-code essentials (rent, utilities) against discretionary spends (dining out, entertainment). This visual breakdown empowers critical decisions: perhaps reduce streaming subscriptions by one to redirect funds towards emergency savings.`,
        `Regular review sessions—weekly or bi-weekly—are essential. At each checkpoint, ask: “Which category ballooned unexpectedly?” and “What triggered it?” This introspection prevents unpleasant surprises when bills arrive. Expense tracking is not an end in itself but a dynamic feedback system steering you toward financial goals.`,
      ],
      diagram: '/assets/expense-tracker-workflow.jpeg',
    },
    {
      title: 'Envelope Method Reinvented for the Digital Age',
      paragraphs: [
        `The classic envelope budgeting system divides your income into different categories using envelopes with fixed budgets. Modern digital tools have reinvented this approach, making it easier to track and allocate funds without physical cash.`,
      ],
      chartData: [
        { category: 'Allocated', value: 5000 },
        { category: 'Spent', value: 3500 },
        { category: 'Remaining', value: 1500 },
      ],
      additionalSections: [
        { label: 'Allocated', color: '#22c55e', value: 5000 },
        { label: 'Spent', color: '#3b82f6', value: 3500 },
        { label: 'Remaining', color: '#fbbf24', value: 1500 },
      ],
    },
    {
      title: 'Zero-Based Budgeting: Giving Every Rupee a Job',
      paragraphs: [
        `Zero-based budgeting ensures your income minus expenses equals zero, meaning every rupee is assigned a purpose. This helps avoid wasteful spending and encourages intentional financial planning.`,
      ],
    },
    {
      title: 'Automating Your Savings: From Round-Ups to Robo-Advisors',
      paragraphs: [
        `Building wealth isn’t about grand gestures—it’s about consistency. That’s where automating your savings steps in, transforming good intentions into real, compounding results. Instead of relying on willpower to move money from your account, automation does the heavy lifting, making saving a background process you barely notice.`,
        `Start with the basics by setting up automatic transfers to savings accounts or investment platforms right after you get paid.`,
      ],
    },
    {
      title: 'Credit Score Mastery: How Tracking Helps You Win at Credit',
      paragraphs: [
        `Your credit score is a numeric representation of your creditworthiness. By tracking your credit usage and repayments, you can improve your score, unlocking better loan rates and credit card offers.`,
      ],
    },
    {
      title: 'SIP vs. Lump-Sum: Timing Your Equity Investments',
      paragraphs: [
        `When it comes to investing in equities, you can either invest via Systematic Investment Plans (SIP) or lump sums. SIPs spread out your investment, reducing market timing risk.`,
      ],
      chartData: [
        { category: 'SIP Returns (%)', value: 12 },
        { category: 'Lump-Sum Returns (%)', value: 10 },
      ],
      additionalSections: [
        { label: 'SIP Returns (%)', color: '#22c55e', value: 12 },
        { label: 'Lump-Sum Returns (%)', color: '#3b82f6', value: 10 },
      ],
    },
    {
      title: 'Emergency Funds: Your First Line of Defense',
      paragraphs: [
        `Life has a knack for throwing curveballs. An emergency fund is your financial safety net to cover unforeseen expenses like medical emergencies or sudden job loss.`,
      ],
      diagram: '/assets/emergency-fund.jpeg',
    },
    {
      title: 'Debt Avalanche vs. Snowball: Tactics for Faster Paydown',
      paragraphs: [
        `Paying down debt strategically can save you thousands in interest. The avalanche method targets high-interest debt first, while the snowball method pays off smaller debts first for motivation.`,
      ],
      chartData: [
        { category: 'Debt Avalanche (Interest %)', value: 24 },
        { category: 'Debt Snowball (Interest %)', value: 30 },
      ],
      additionalSections: [
        { label: 'Debt Avalanche (Interest %)', color: '#22c55e', value: 24 },
        { label: 'Debt Snowball (Interest %)', color: '#3b82f6', value: 30 },
      ],
    },
    {
      title: 'Tax-Efficient Investing: Harvesting Gains and Losses',
      paragraphs: [
        `When it comes to building wealth, managing your tax liability is key. Tax-efficient investing helps maximize your returns by minimizing taxes on gains.`,
      ],
      chartData: [
        { category: 'Taxable Investments', value: 60 },
        { category: 'Tax-Deferred Investments', value: 25 },
        { category: 'Tax-Exempt Investments', value: 15 },
      ],
      chartType: 'pie',
    },
    {
      title: 'Mindful Spending: Psychology-Backed Ways to Curb Impulse Buys',
      paragraphs: [
        `Impulse buying can sabotage your budget. Mindful spending techniques, backed by psychology, can help you curb those urges and align purchases with your goals.`,
      ],
      diagram: '/assets/mindful-spending.jpeg',
    },
  ];

  const transformChartData = (chartData) => {
    if (!chartData) return null;

    const obj = { name: 'Budget' };
    const keys = [];
    chartData.forEach((item) => {
      const key = item.category.replace(/[^a-zA-Z0-9]/g, '');
      obj[key] = item.value;
      keys.push(key);
    });
    return { data: [obj], keys };
  };

  return (
    <section
      className="pt-24 px-6 max-w-7xl mx-auto animate-fade-up"
      style={{ scrollBehavior: 'smooth' }}
    >
      <h2 className="text-4xl neon-glow mb-6">Articles & Techniques</h2>
      <div className="space-y-12">
        {articles.map((art, i) => {
          const chartTransformed = transformChartData(art.chartData);

          return (
            <motion.div
              key={i}
              id={`article-${i}`}
              className="glass-card p-6 border border-gray-700 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl neon-glow mb-4">{art.title}</h3>

              {art.paragraphs.map((para, idx) => (
                <p key={idx} className="opacity-75 mb-4">{para}</p>
              ))}

              {art.diagram && (
                <div className="w-full flex justify-center mb-6 overflow-hidden">
                  <ConveyorBelt src={art.diagram} alt={`${art.title} illustration`} />
                </div>
              )}

              {chartTransformed && (
                <div className="h-64 mb-6">
                  <Chart data={chartTransformed.data} keys={chartTransformed.keys} type={art.chartType} />
                </div>
              )}

              {art.additionalSections && (
                <div className="flex flex-col gap-2">
                  {art.additionalSections.map((section, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: section.color }}></div>
                      <span className="text-white font-semibold">{section.label}: {section.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ConveyorBelt({ src, alt }) {
  const images = new Array(6).fill(src);

  return (
    <div className="relative w-full md:w-2/3 max-w-[700px] h-[200px] overflow-hidden rounded-2xl shadow-lg">
      <motion.div
        className="flex absolute left-0 top-0 h-full"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={alt}
            loading="lazy"
            className="h-full w-auto object-cover mx-2 rounded-lg"
          />
        ))}
      </motion.div>
    </div>
  );
}
