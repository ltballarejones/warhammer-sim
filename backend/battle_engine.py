# battle_engine.py

import random
import logging

# Simple module logger — change level in your app if you need more/less verbosity
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def roll_d6():
    return random.randint(1, 6)

def hits(attacker, phase):
    weapon = attacker.get(phase, {}).get("weapon", {})
    bs = weapon.get("bs", attacker.get("bs"))
    attacks = weapon.get("attacks", attacker.get("attacks", 1))
    if bs is None:
        return 0
    rolls = [roll_d6() for _ in range(attacks)]
    return sum(1 for r in rolls if r >= bs)

def wounds(weapon, defender, hits):
    strength = weapon.get("strength", 0)
    toughness = defender.get("toughness", 1)

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

def saves(defender, wounds_count, ap=0):
    base_save = defender.get("save")
    if base_save is None:
        # No save defined => all wounds become failed saves
        return wounds_count

    # AP in unit data is given as negative numbers (e.g. -1),
    # effective save increases when AP is negative.
    effective_save = base_save - ap
    if effective_save <= 1:
        effective_save = 2
    if effective_save > 6:
        return wounds_count

    rolls = [roll_d6() for _ in range(wounds_count)]
    return sum(1 for r in rolls if r < effective_save)  # failed saves

def simulate_battle(attacker, defender, phase):
    weapon = attacker.get(phase, {}).get("weapon", {})

    hit_count = hits(attacker, phase)
    wound_count = wounds(weapon, defender, hit_count)
    failed_saves = saves(defender, wound_count, weapon.get("ap", 0))

    total_damage = failed_saves * weapon.get("damage", 1)

    # Log key intermediate values to the console for debugging
    logger.info(
        "[battle] phase=%s attacker=%s defender=%s weapon=%s hits=%d wounds=%d failed_saves=%d damage=%d",
        phase,
        attacker.get("name"),
        defender.get("name"),
        weapon.get("name"),
        hit_count,
        wound_count,
        failed_saves,
        total_damage,
    )

    return {
        "attacker": attacker.get("name"),
        "defender": defender.get("name"),
        "phase": phase,
        "hits": hit_count,
        "wounds": wound_count,
        "failed_saves": failed_saves,
        "damage_dealt": total_damage
    }