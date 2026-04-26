import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [response, setResponse] = useState('');

  //add comment to test commit 1
  //switch branch to test branch sampleone

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/add-asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location }),
      });
      const data = await res.json();
      setResponse(data.message || JSON.stringify(data));
    } catch (err) {
      setResponse('Error: ' + err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Mini Asset Sender</h2>

        <input
          placeholder="Asset Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <input
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <br />

        <button onClick={handleSubmit}>Submit</button>

        <h3>{response}</h3>
      </header>
    </div>
  );
}

export default App;