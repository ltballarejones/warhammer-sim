# main.py

from fastapi import FastAPI
from pydantic import BaseModel
from backend.units import UNITS
from backend.battle_engine import simulate_battle
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

class BattleRequest(BaseModel):
    phase: str
    attacker: str
    defender: str
    attackerFaction: str
    defenderFaction: str
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Warhammer 40k Battle Simulator API"}

@app.get("/factions")
def get_factions():
    return {"factions": list(UNITS.keys())}

@app.get("/units")
def get_units(faction: str | None = None):
    if faction:
        units = UNITS.get(faction, [])
        return {"units": units}
    return {"units": []}


@app.post("/battle")
def battle(req: BattleRequest):
    phase = req.phase.lower()
    if phase not in ["melee", "ranged"]:
        return {"error": "Invalid phase. Must be 'melee' or 'ranged'"} 
    attacker = get_unit(req.attackerFaction, req.attacker)
    defender = get_unit(req.defenderFaction, req.defender)


    if not attacker or not defender:
        return {"error": f"Invalid unit name: {req.attacker} or {req.defender}"}
    print(phase,attacker,defender)

    result = simulate_battle(attacker, defender,phase)
    return result


def get_unit(faction: str, name: str):
    units = UNITS.get(faction, [])
    return next((u for u in units if u["name"] == name), None)
