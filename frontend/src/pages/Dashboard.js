import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InsightCard from '../components/InsightCard';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [insights, setInsights] = useState([]);
  const [sentimentCounts, setSentimentCounts] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('fb_token');

    axios
      .get(`http://localhost:8000/insights/analyze?token=${token}&method=ml`)
      .then((res) => {
        setInsights(res.data.insights);

        // Count labels
        const counts = { positive: 0, negative: 0, neutral: 0 };
        res.data.insights.forEach((item) => {
          const label = item.label;
          if (counts[label] !== undefined) {
            counts[label]++;
          }
        });
        setSentimentCounts(counts);
      });
  }, []);

  const chartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: '# of Messages',
        data: [
          sentimentCounts.positive,
          sentimentCounts.negative,
          sentimentCounts.neutral,
        ],
        backgroundColor: ['#4caf50', '#f44336', '#ffc107'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Digital Responsibility Overview</h2>
      <p>This dashboard summarizes your behavior on Facebook using AI-powered insights.</p>

      <div style={{ maxWidth: 400, margin: '20px auto' }}>
        <Pie data={chartData} />
      </div>

      {insights.map((item, index) => (
        <InsightCard key={index} message={item.original} score={item.label} />
      ))}
    </div>
  );
}
