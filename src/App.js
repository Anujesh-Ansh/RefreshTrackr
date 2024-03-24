import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    // Reset refresh count to 0 when component mounts or updates
    const count = parseInt(localStorage.getItem('refreshCount')) || 0;
    setRefreshCount(count);

    const handleBeforeUnload = () => {
      localStorage.setItem('refreshCount', count + 1);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [refreshCount]); // Add refreshCount as dependency to ensure useEffect runs on every refresh

  const handleResetOnClick = () => {
    localStorage.setItem('refreshCount', '0');
    setRefreshCount(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={handleResetOnClick} style={{ cursor: 'pointer' }}>
          <code>
            Refresh Count: {refreshCount}
          </code>
        </p>
        <a
          className="App-link"
          href="https://github.com/Anujesh-Ansh"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </a>
      </header>
    </div>
  );
}

export default App;
