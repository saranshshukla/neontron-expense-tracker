import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#fbbf24', '#f87171', '#a78bfa']; // green, blue, yellow, red, purple

export default function Chart({ data, keys, type }) {
  if (!data || !keys || keys.length === 0) return null;

  if (type === 'pie') {
    const pieData = keys.map((key, index) => ({
      name: key,
      value: data[0][key],
      color: COLORS[index % COLORS.length],
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#222', borderRadius: '8px', border: 'none' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(255,255,255,0.1)' }}
          />
          <Legend
            wrapperStyle={{ color: '#ccc', bottom: -10 }}
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={12}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // Original Bar Chart
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        barCategoryGap="25%"
      >
        <XAxis
          dataKey="name"
          tick={{ fill: '#ddd', fontWeight: 'bold', fontSize: 14 }}
          axisLine={{ stroke: '#555' }}
          tickLine={false}
          label={{
            value: 'Category',
            position: 'insideBottom',
            offset: -30,
            fill: '#aaa',
            fontWeight: 'bold',
            fontSize: 14,
          }}
        />
        <YAxis
          tick={{ fill: '#ddd', fontSize: 14 }}
          axisLine={{ stroke: '#555' }}
          tickLine={false}
          label={{
            value: 'Value',
            angle: -90,
            position: 'insideLeft',
            fill: '#aaa',
            fontWeight: 'bold',
            fontSize: 14,
            offset: 0,
          }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#222', borderRadius: '8px', border: 'none' }}
          itemStyle={{ color: '#fff' }}
          cursor={{ fill: 'rgba(255,255,255,0.1)' }}
        />
        <Legend
          wrapperStyle={{ color: '#ccc', bottom: -10 }}
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          iconSize={12}
        />
        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={COLORS[index % COLORS.length]}
            barSize={40}
            name={key}
            radius={[6, 6, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
