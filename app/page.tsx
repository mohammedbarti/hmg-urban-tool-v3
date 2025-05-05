'use client';
import React, { useState } from 'react';

export default function Home() {
  const [population, setPopulation] = useState('');
  const [area, setArea] = useState('');
  const [walkability, setWalkability] = useState('');
  const [elderly, setElderly] = useState('');
  const [children, setChildren] = useState('');
  const [chronic, setChronic] = useState('');
  const [female, setFemale] = useState('');
  const [density, setDensity] = useState('Low');
  const [growth, setGrowth] = useState('Stable');
  const [settingType, setSettingType] = useState('Urban');
  const [model, setModel] = useState('Low-Cost Model');
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const pop = parseInt(population);
    const km2 = parseFloat(area);
    const eld = parseFloat(elderly);
    const kids = parseFloat(children);
    const chr = parseFloat(chronic);
    const fem = parseFloat(female);

    let ambulances = Math.ceil(pop / 2000);
    let phcs = Math.ceil(pop / 10000);
    let emergencyPods = Math.ceil(pop / 10000);

    let mobileClinics = model === 'Low-Cost Model'
      ? Math.ceil(km2 / 20)
      : Math.ceil(km2 / 30);

    let telehealthBooths = model === 'Low-Cost Model'
      ? Math.ceil(pop / 25000)
      : Math.ceil(pop / 5000);

    // Demographic modifiers
    if (eld > 15) telehealthBooths += 1;
    if (chr > 20) mobileClinics += 1;
    if (kids > 25) phcs += 1;

    const helipad = settingType === 'Rural' ? 1 : 0;
    const womensClinic = fem > 60 ? 1 : 0;

    setResults({
      ambulances,
      phcs,
      emergencyPods,
      mobileClinics,
      telehealthBooths,
      helipad,
      womensClinic,
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <img src="/logo.png" alt="Logo" style={{ height: 50 }} />
      <h1 style={{ textAlign: 'center' }}>HMG Urban Planning Tool</h1>
      <p style={{ textAlign: 'center' }}>
        Enter basic community info to get infrastructure recommendations.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '900px', margin: 'auto' }}>
        <label>Population:<input type="number" value={population} onChange={(e) => setPopulation(e.target.value)} /></label>
        <label>Area (km²):<input type="number" value={area} onChange={(e) => setArea(e.target.value)} /></label>
        <label>Walkability Radius (meters):<input type="number" value={walkability} onChange={(e) => setWalkability(e.target.value)} /></label>
        <label>% Elderly Population:<input type="number" value={elderly} onChange={(e) => setElderly(e.target.value)} /></label>
        <label>% Children Population:<input type="number" value={children} onChange={(e) => setChildren(e.target.value)} /></label>
        <label>% Chronic / Regular Care:<input type="number" value={chronic} onChange={(e) => setChronic(e.target.value)} /></label>
        <label>% Female:<input type="number" value={female} onChange={(e) => setFemale(e.target.value)} /></label>
        <label>Density:
          <select value={density} onChange={(e) => setDensity(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label>Growth Status:
          <select value={growth} onChange={(e) => setGrowth(e.target.value)}>
            <option>Stable</option>
            <option>Growing</option>
            <option>Declining</option>
          </select>
        </label>
        <label>Setting Type:
          <select value={settingType} onChange={(e) => setSettingType(e.target.value)}>
            <option>Urban</option>
            <option>Rural</option>
          </select>
        </label>
        <label>Deployment Model:
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option>Low-Cost Model</option>
            <option>Ideal Model</option>
          </select>
        </label>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={calculate} style={{ fontSize: '1.2rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Calculate
        </button>
      </div>

      {results && (
        <div style={{ marginTop: '2rem' }}>
          <h2>✅ Recommendations:</h2>
          <ul style={{ fontSize: '18px', lineHeight: '1.8' }}>
            <li>🚑 <strong>Ambulances: {results.ambulances}</strong> — Based on WHO standard of 1 per 2,000 people</li>
            <li>🏥 <strong>Primary Healthcare Centers: {results.phcs}</strong> — Based on 1 per 10,000 people{parseFloat(children) > 25 ? ' (+1 due to high % of children)' : ''}</li>
            <li>🆘 <strong>Emergency Pods: {results.emergencyPods}</strong> — For high-density and quick-access response coverage</li>
            <li>🧑‍💻 <strong>Telehealth Booths: {results.telehealthBooths}</strong> — Based on 1 per 5,000 people{parseFloat(elderly) > 15 ? ' (+1 due to high % of elderly)' : ''}</li>
            <li>🚐 <strong>Mobile Clinics: {results.mobileClinics}</strong> — Based on 1 per 30 km²{parseFloat(chronic) > 20 ? ' (+1 due to high % of chronic care)' : ''}</li>
            {results.helipad ? <li>🚁 <strong>Helipad: 1</strong> — For rural or remote access settings</li> : null}
            {results.womensClinic ? <li>👩‍⚕️ <strong>Women’s Clinic: 1</strong> — Due to high % of female population</li> : null}
          </ul>
        </div>
      )}

      {/* Footer note */}
      <div style={{ position: 'fixed', bottom: 10, right: 20, fontSize: '14px', color: '#666' }}>
        Made by: Dr. Mohammed AlBarti – Corporate Business Development
      </div>
    </div>
  );
}
