import React from 'react';

export default function Login() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome to the Digital Responsibility Analyzer</h2>
      <p>Log in with your Facebook to begin analyzing your behavior responsibly.</p>
      <a href="http://localhost:8000/auth/facebook">
        <button style={{ padding: '10px 20px', fontSize: 16 }}>Login with Facebook</button>
      </a>
    </div>
  );
}
