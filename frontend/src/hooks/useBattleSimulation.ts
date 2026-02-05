import { useState } from "react";
import { BattleResult, simulateBattle } from "../services/battleService";

export function useBattleSimulation( params?: {} ) {
  const [result, setResult] = useState<BattleResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function simulate({ phase, attacker, defender, attackerFaction, defenderFaction }: { phase: string; attacker: string; defender: string; attackerFaction: string; defenderFaction: string }) {
    setLoading(true);
    const battleResult = await simulateBattle({ phase, attacker, defender,attackerFaction,defenderFaction });
    setResult(battleResult);
    setLoading(false);
  }

  return { result, loading, simulate };
}
