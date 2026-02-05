import { useState } from "react";
import { simulateBattle, BattleResult, fetchUnits, UnitRequest } from "../services/battleService";
import { useUnits } from "../hooks/useUnits";
import { UnitSelect } from "./UnitSelect";
import { FactionSelect } from "./FactionSelect";
import { useBattleSimulation } from "../hooks/useBattleSimulation";

export default function BattleSimulator() {
  const { result, loading: resultLoading, simulate } = useBattleSimulation();
  const [attackerUnit, setAttackerUnit] = useState("");
  const [defenderUnit, setDefenderUnit] = useState("");
  const [phase, setPhase] = useState("");
  const [attackerFaction, setAttackerFaction] = useState("");
  const [defenderFaction, setDefenderFaction] = useState("");


  return (
    <div>
      <select name="phase" id="phase" value={phase} onChange={(e) => setPhase(e.target.value)}>
          <option value="ranged">Shooting</option>
          <option value="melee">Melee</option>
    </select>
    <FactionSelect value={attackerFaction} onChange={setAttackerFaction} />
    <UnitSelect label="Attacker" value={attackerUnit} onChange={setAttackerUnit} faction={attackerFaction} />
    <FactionSelect value={defenderFaction} onChange={setDefenderFaction} />
    <UnitSelect label="Defender" value={defenderUnit} onChange={setDefenderUnit} faction={defenderFaction} />
    <button onClick={handleSimulate}>Simulate Battle</button>

      {result && (
        <div>
          <p>Attacker: {result.attacker}</p>
          <p>Defender: {result.defender}</p>
          <p>Damage Dealt: {result.damage_dealt}</p>
          <p>Failed Saves: {result.failed_saves}</p>
          <p>Hits: {result.hits}</p>
          <p>Phase: {result.phase}</p>
          <p>Wounds: {result.wounds}</p>
        </div>
      )}
    </div>
  );

   function handleSimulate() {
          simulate({ phase, attacker: attackerUnit, defender: defenderUnit ,attackerFaction, defenderFaction});
        }
}