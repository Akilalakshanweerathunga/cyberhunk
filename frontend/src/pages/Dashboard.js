import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InsightCard from '../components/InsightCard';

export default function Dashboard() {
  const [insights, setInsights] = useState([]);     // Always an array
  const [error, setError] = useState(null);         // Optional: for better UX
  const [loading, setLoading] = useState(true);     // Optional: loading state

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('fb_token', token);
    }

    const fbToken = localStorage.getItem('fb_token');
    if (!fbToken) {
      setError('Missing Facebook token');
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8000/insights/analyze?token=${fbToken}`)
      .then(res => {
        const result = res.data.insights || [];     // ✅ ensure it's an array
        setInsights(result);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching insights:", err);
        setError("Failed to load insights.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Digital Responsibility Overview </h2>

      {loading && <p>Loading insights...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {(insights || []).map((item, index) => (
        <InsightCard key={index} message={item.message} score={item.score?.compound} />
      ))}
    </div>
  );
}
