// services/battleService.ts
import api from "./api";
export interface UnitRequest {
  id: string;
  name:  string;
}

export interface BattleRequest {
  phase: string;
  attacker: any;
  defender: any;
  attackerFaction: string;
  defenderFaction: string;
}

export interface BattleResult {
  attacker: string;
  damage_dealt: number;
  defender: string;
  failed_saves: number;
  hits: number;
  phase: string;
  wounds: number;
}

export async function simulateBattle(data: BattleRequest) {
  const response = await api.post<BattleResult>("/battle", data);
  return response.data;
}

export async function fetchUnits(faction: string) {
  const response = await api.get<{ units: UnitRequest[] }>(`/units?faction=${faction}`);
  return response.data.units;
}

export async function fetchFactions() {
  const response = await api.get<{ factions: string[] }>("/factions");
  return response.data.factions;
}
