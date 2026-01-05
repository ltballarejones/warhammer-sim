# main.py

from fastapi import FastAPI
from pydantic import BaseModel
from backend.units import UNITS
from backend.battle_engine import simulate_battle

app = FastAPI()

class BattleRequest(BaseModel):
    attacker: str
    defender: str

@app.get("/")
def root():
    return {"message": "Warhammer 40k Battle Simulator API"}

@app.post("/battle")
def battle(req: BattleRequest):
    attacker = UNITS.get(req.attacker)
    defender = UNITS.get(req.defender)

    if not attacker or not defender:
        return {"error": "Invalid unit name"}

    result = simulate_battle(attacker, defender)
    return result