'use client';
import React, { useState } from 'react';

const Page = () => {
  const [population, setPopulation] = useState('');
  const [area, setArea] = useState('');
  const [walkabilityRadius, setWalkabilityRadius] = useState('');
  const [elderly, setElderly] = useState('');
  const [children, setChildren] = useState('');
  const [chronic, setChronic] = useState('');
  const [female, setFemale] = useState('');
  const [density, setDensity] = useState('Low');
  const [growth, setGrowth] = useState('Stable');
  const [setting, setSetting] = useState('Urban');
  const [deployment, setDeployment] = useState('Low-Cost Model');
  const [recommendations, setRecommendations] = useState<string[]>([]);

const handleClick = () => {
  const pop = parseInt(population);
  const km2 = parseFloat(area);
  const walk = parseInt(walkabilityRadius) || 600;

  const percentElderly = parseFloat(elderly) || 0;
  const percentChildren = parseFloat(children) || 0;
  const percentChronic = parseFloat(chronic) || 0;
  const percentFemale = parseFloat(female) || 0;

  if (isNaN(pop) || isNaN(km2)) return;

  const results: string[] = [];

  // Ambulance
  results.push(`🚑 Ambulances: ${Math.ceil(pop / 2000)}`);

  // PHCs
  let phcs = Math.ceil(pop / 10000);
  if (percentChildren > 25) phcs += 1;
  results.push(`🏥 Primary Healthcare Centers: ${phcs}`);

  // Emergency Pods
  results.push(`🆘 Emergency Pods: ${Math.ceil(pop / 10000)}`);

  // Telehealth Booths
  let telehealth = deployment === 'Ideal Model'
    ? Math.ceil(pop / 5000)
    : Math.ceil(pop / 25000);
  if (percentElderly > 15) telehealth += 1;
  results.push(`🧑‍💻 Telehealth Booths: ${telehealth} (${deployment === 'Ideal Model' ? '1 per 5,000 people' : '1 per 25,000 people'})`);

  // Mobile Clinics
  let mobileClinics = deployment === 'Ideal Model'
    ? Math.ceil(km2 / 30)
    : Math.ceil(km2 / 20);
  if (percentChronic > 20) mobileClinics += 1;
  results.push(`🚐 Mobile Clinics: ${mobileClinics} (${deployment === 'Ideal Model' ? '1 per 30 km²' : '1 per 20 km²'})`);

  // Women's Clinic Suggestion
  if (percentFemale > 60) {
    results.push(`🏩 Women’s Health Center: Recommended (High % Female Population)`);
  }

  // Helipad
  if (setting === 'Rural') {
    results.push('🚁 Helipad: 1 (for remote access)');
  }

  setRecommendations(results);
};

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <img src="/logo.png" alt="Logo" style={{ height: 40, marginBottom: '1rem' }} />

      <h1 style={{ textAlign: 'center' }}>HMG Urban Planning Tool</h1>
      <p style={{ textAlign: 'center' }}>Enter basic community info to get infrastructure recommendations.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <label style={{ flex: '1 1 45%' }}>
          Population:
          <input value={population} onChange={(e) => setPopulation(e.target.value)} type="number" />
        </label>
        <label style={{ flex: '1 1 45%' }}>
          Area (km²):
          <input value={area} onChange={(e) => setArea(e.target.value)} type="number" />
        </label>
        <label style={{ flex: '1 1 45%' }}>
          Walkability Radius (meters):
          <input value={walkabilityRadius} onChange={(e) => setWalkabilityRadius(e.target.value)} type="number" />
        </label>
        <label style={{ flex: '1 1 45%' }}>
          % Elderly Population:
          <input value={elderly} onChange={(e) => setElderly(e.target.value)} type="number" />
        </label>
        <label style={{ flex: '1 1 45%' }}>
          % Children Population:
          <input value={children} onChange={(e) => setChildren(e.target.value)} type="number" />
        </label>
        <label style={{ flex: '1 1 45%' }}>
          % Chronic / Regular Care:
          <input value={chronic} onChange={(e) => setChronic(e.target.value)} type="number" />
        </label>
        <label style={{ flex: '1 1 45%' }}>
          % Female:
          <input value={female} onChange={(e) => setFemale(e.target.value)} type="number" />
        </label>
        <label style={{ flex: '1 1 45%' }}>
          Density:
          <select value={density} onChange={(e) => setDensity(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label style={{ flex: '1 1 45%' }}>
          Growth Status:
          <select value={growth} onChange={(e) => setGrowth(e.target.value)}>
            <option>Stable</option>
            <option>Growing</option>
            <option>Declining</option>
          </select>
        </label>
        <label style={{ flex: '1 1 45%' }}>
          Setting Type:
          <select value={setting} onChange={(e) => setSetting(e.target.value)}>
            <option>Urban</option>
            <option>Rural</option>
          </select>
        </label>
        <label style={{ flex: '1 1 100%' }}>
          Deployment Model:
          <select value={deployment} onChange={(e) => setDeployment(e.target.value)}>
            <option>Low-Cost Model</option>
            <option>Ideal Model</option>
          </select>
        </label>
      </div>

      <button onClick={handleClick} style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', marginBottom: '2rem' }}>
        Calculate
      </button>

      {recommendations.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          <ul>
            {recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      <footer style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#555', textAlign: 'center' }}>
        Made by: Dr. Mohammed alBarti – Corporate Business Development
      </footer>
    </div>
  );
};

export default Page;
