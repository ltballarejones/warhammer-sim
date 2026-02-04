import { useState } from "react";
import { simulateBattle, BattleResult } from "../services/battleService";

export default function BattleSimulator() {
  const [result, setResult] = useState<BattleResult | null>(null);

  async function handleSimulate() {
    const data = {
      phase : "melee", 
      attacker: "ork_boy",
      defender: "space_marine" 
    };

    const battleResult = await simulateBattle(data);
    setResult(battleResult);
  }

  return (
    <div>
      <button onClick={handleSimulate}>Simulate Battle</button>

      {result && (
        <div>
          <p>Attacker: {result.attacker}</p>
          <p>Defender: {result.defender}</p>
          <p>Damage Dealt: {result.damage_delalt}</p>
          <p>Failed Saves: {result.failed_saves}</p>
          <p>Hits: {result.hits}</p>
          <p>Phase: {result.phase}</p>
          <p>Wounds: {result.wounds}</p>
        </div>
      )}
    </div>
  );
}