'use client';

import React, { useState } from 'react';

const Page = () => {
  const [population, setPopulation] = useState('');
  const [area, setArea] = useState('');
  const [walkability, setWalkability] = useState('');
  const [deploymentModel, setDeploymentModel] = useState('low-cost');
  const [results, setResults] = useState(null);

  const calculate = () => {
    const pop = parseInt(population);
    const km2 = parseFloat(area);
    const walkRadius = parseInt(walkability);

    if (isNaN(pop) || isNaN(km2) || isNaN(walkRadius)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const ambulances = Math.ceil(pop / 2000);

    let adjustedMobileClinics;
    let adjustedTelehealthBooths;

    if (deploymentModel === 'low-cost') {
      adjustedMobileClinics = Math.ceil(km2 / 20);
      adjustedTelehealthBooths = Math.ceil(pop / 25000);
    } else {
      adjustedMobileClinics = Math.ceil(km2 / 10);
      adjustedTelehealthBooths = Math.ceil(pop / 12500);
    }

    const phcs = Math.ceil(pop / 10000);
    const emergencyPods = Math.ceil(pop / 5000);

    setResults({
      ambulances,
      adjustedMobileClinics,
      adjustedTelehealthBooths,
      phcs,
      emergencyPods,
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Arial' }}>
      <img src="/logo.png" alt="Logo" style={{ position: 'absolute', top: 10, left: 10, height: 40 }} />

      <h1>HMG Urban Planning Tool</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem', textAlign: 'left' }}>
        <div>
          <label>Population:</label>
          <input value={population} onChange={(e) => setPopulation(e.target.value)} type="number" placeholder="e.g., 20000" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label>Area (km²):</label>
          <input value={area} onChange={(e) => setArea(e.target.value)} type="number" placeholder="e.g., 50" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label>Walkability Radius (meters):</label>
          <input value={walkability} onChange={(e) => setWalkability(e.target.value)} type="number" placeholder="e.g., 500" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label>Deployment Model:</label>
          <select value={deploymentModel} onChange={(e) => setDeploymentModel(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
            <option value="low-cost">Low-Cost Model</option>
            <option value="ideal">Ideal Model</option>
          </select>
        </div>
      </div>

      <button onClick={calculate} style={{ marginTop: '2rem', padding: '1rem 2rem', fontSize: '1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
        Calculate
      </button>

      {results && (
        <div style={{ marginTop: '3rem', textAlign: 'left' }}>
          <h2>Recommendations</h2>
          <ul>
            <li>🚑 Ambulances: {results.ambulances}</li>
            <li>🏥 Primary Healthcare Centers: {results.phcs}</li>
            <li>🆘 Emergency Pods: {results.emergencyPods}</li>
            <li>🚐 Mobile Clinics: {results.adjustedMobileClinics} ({deploymentModel === 'low-cost' ? '1 per 20 km²' : '1 per 10 km²'})</li>
            <li>📡 Telehealth Booths: {results.adjustedTelehealthBooths} ({deploymentModel === 'low-cost' ? '1 per 25,000 people' : '1 per 12,500 people'})</li>
          </ul>
        </div>
      )}

      <footer style={{ marginTop: '4rem', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
        Made by: Dr. Mohammed alBarti – Corporate Business Development
      </footer>
    </div>
  );
};

export default Page;
