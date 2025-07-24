import React from 'react';

export default function InsightCard({ message, score }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10
    }}>
      <p>{message}</p>
      <strong>Sentiment Score:</strong> {score}
    </div>
  );
}