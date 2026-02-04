// services/battleService.ts
import api from "./api";

export interface BattleRequest {
  attacker: any;
  defender: any;
}

export interface BattleResult {
  attacker: string;
  damage_delalt: number;
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
