import React from 'react';

export default function InsightCard({ message, score }) {
  const color = score === 'positive' ? 'green' : score === 'negative' ? 'red' : 'orange';

  return (
    <div style={{
      border: `2px solid ${color}`,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    }}>
      <p>{message}</p>
      <strong style={{ color }}>Sentiment: {score}</strong>
    </div>
  );
}
