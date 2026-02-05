import React from "react";
import { useFactions } from "../hooks/useFactions"; 

export function FactionSelect({ value, onChange }:{ value: string; onChange: (value: string) => void }) {
  const { factions, loading } = useFactions();

  if (loading) return <p>Loading factions...</p>;

  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {factions.map(f => (
        <option key={f} value={f}>{f}</option>
      ))}
    </select>
  );
}
