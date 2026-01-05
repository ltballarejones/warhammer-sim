# battle_engine.py

import random

def roll_d6():
    return random.randint(1, 6)

def hits(attacker):
    bs = attacker["bs"]
    rolls = [roll_d6() for _ in range(attacker["attacks"])]
    return sum(1 for r in rolls if r >= bs)

def wounds(attacker, defender, hits):
    strength = attacker["weapon"]["strength"]
    toughness = defender["toughness"]

    # Basic wound chart
    if strength >= toughness * 2:
        needed = 2
    elif strength > toughness:
        needed = 3
    elif strength == toughness:
        needed = 4
    elif strength * 2 <= toughness:
        needed = 6
    else:
        needed = 5

    rolls = [roll_d6() for _ in range(hits)]
    return sum(1 for r in rolls if r >= needed)

def saves(defender, wounds):
    save = defender["save"]
    rolls = [roll_d6() for _ in range(wounds)]
    return sum(1 for r in rolls if r < save)  # failed saves

def simulate_battle(attacker, defender):
    hit_count = hits(attacker)
    wound_count = wounds(attacker, defender, hit_count)
    failed_saves = saves(defender, wound_count)

    total_damage = failed_saves * attacker["weapon"]["damage"]

    return {
        "attacker": attacker["name"],
        "defender": defender["name"],
        "hits": hit_count,
        "wounds": wound_count,
        "failed_saves": failed_saves,
        "damage_dealt": total_damage
    }