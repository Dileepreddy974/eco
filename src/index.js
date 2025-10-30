import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Learn from './pages/Learn';
import Profile from './pages/Profile';

// Global styles - macOS Inspired
const globalStyles = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 
      'Arial', 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f7;
    color: #333;
  }
  
  code {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 'Droid Sans Mono', 
      'Source Code Pro', monospace;
  }
  
  /* macOS-style focus ring */
  *:focus-visible {
    outline: 2px solid #4ade80;
    outline-offset: 2px;
    border-radius: 6px;
  }
  
  /* Smooth transitions */
  * {
    transition: background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
  }
  
  /* Enhanced typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  
  /* macOS-style buttons */
  button {
    font-family: inherit;
    border-radius: 6px;
  }
  
  /* Improved input fields */
  input, textarea, select {
    font-family: inherit;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    padding: 8px 12px;
  }
  
  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
  }
`;

function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
          <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
          <Route path="/learn" element={<Layout><Learn /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);