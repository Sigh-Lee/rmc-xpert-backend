
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>🚀 RMC X-PERT Client Interface</h1>
      <p>Connected to Backend: {import.meta.env.VITE_API_URL}</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
