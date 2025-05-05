"use client";

import React, { useState } from 'react';

const Page = () => {
  const [population, setPopulation] = useState("");
  const [area, setArea] = useState("");
  const [walkability, setWalkability] = useState("");
  const [elderly, setElderly] = useState("");
  const [children, setChildren] = useState("");
  const [chronic, setChronic] = useState("");
  const [female, setFemale] = useState("");
  const [density, setDensity] = useState("Low");
  const [growth, setGrowth] = useState("Stable");
  const [setting, setSetting] = useState("Urban");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const calculate = () => {
    const pop = parseInt(population);
    const km2 = parseFloat(area);
    const walk = parseFloat(walkability);

    const phc = Math.ceil(pop / 10000);
    const pods = Math.ceil(pop / 5000);
    const tele = Math.ceil(pop * 0.00004);
    const mobile = Math.ceil(km2 / 10);
    const ambulances = Math.ceil(pop / 10000);
    const helipad = setting === "Rural" ? 1 : 0;

    const recs = [
      `🩺 ${phc} Primary Healthcare Centers — Based on 1 per 10,000 people`,
      `🔥 ${pods} Emergency Pods — For high-density and quick-access needs`,
      `📡 ${tele} Telehealth Booths — For digitally connected underserved zones`,
      `🚐 ${mobile} Mobile Clinics — One per 10 km² coverage`,
      `🚑 ${ambulances} Ambulance Units — Based on WHO standard of 1 per 10,000 people`
    ];
    if (helipad) recs.push("🚁 1 Helipad — Required for rural emergency transport readiness");

    setRecommendations(recs);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <img src="/logo.png" alt="Logo" style={{ position: "absolute", top: 10, left: 10, height: 40 }} />
      <h1 style={{ textAlign: "center" }}>HMG Urban Planning Tool</h1>
      <p style={{ textAlign: "center" }}>Enter basic community info to get infrastructure recommendations.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", maxWidth: "600px", margin: "0 auto" }}>
        <label>Population: <input type="number" value={population} onChange={e => setPopulation(e.target.value)} /></label>
        <label>Area (km²): <input type="number" value={area} onChange={e => setArea(e.target.value)} /></label>
        <label>Walkability Radius (m): <input type="number" value={walkability} onChange={e => setWalkability(e.target.value)} /></label>
        <label>% Elderly Population: <input type="number" value={elderly} onChange={e => setElderly(e.target.value)} /></label>
        <label>% Children Population: <input type="number" value={children} onChange={e => setChildren(e.target.value)} /></label>
        <label>% Chronic / Regular Care: <input type="number" value={chronic} onChange={e => setChronic(e.target.value)} /></label>
        <label>% Female: <input type="number" value={female} onChange={e => setFemale(e.target.value)} /></label>
        <label>Density:
          <select value={density} onChange={e => setDensity(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label>Growth Status:
          <select value={growth} onChange={e => setGrowth(e.target.value)}>
            <option>Stable</option>
            <option>Growing</option>
            <option>Declining</option>
          </select>
        </label>
        <label>Setting Type:
          <select value={setting} onChange={e => setSetting(e.target.value)}>
            <option>Urban</option>
            <option>Rural</option>
          </select>
        </label>
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={calculate}>Generate Recommendations</button>
      </div>
      <div style={{ paddingTop: "2rem", maxWidth: "700px", margin: "0 auto" }}>
        <h2>Recommendations:</h2>
        <ul>
          {recommendations.map((r, i) => <li key={i}><strong>{r}</strong></li>)}
        </ul>
      </div>
      <footer style={{ marginTop: "4rem", textAlign: "center", fontSize: "0.8rem" }}>
        Made by: Dr. Mohammed alBarti – Corporate Business Development
      </footer>
    </div>
  );
};

export default Page;