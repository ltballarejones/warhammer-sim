# units.py

UNITS = {
    "space_marine": {
        "name": "Space Marine",
        "toughness": 4,
        "save": 3,
        "wounds": 2,
        "melee": {
            "weapon": {
                "attacks": 1,
                "name": "Chainsword",
                "bs": 3,
                "strength": 4,
                "ap": 0,
                "damage": 1
            }
        },  
        "ranged": {
            "weapon": {
                "attacks": 1,
                "name": "Bolt Rifle",
                "bs": 3,
                "strength": 4,
                "ap": -1,
                "damage": 1
            }
        }
    },
    "ork_boy": {
        "name": "Ork Boy",
        "toughness": 5,
        "save": 5,
        "wounds": 1,
        "melee": {
            "weapon": {
                "attacks": 3,
                "name": "Choppa",
                "bs": 3,
                "strength": 4,
                "ap": -1,
                "damage": 1
            }
        },
        "ranged": {
            "weapon": {
                "attacks": 1,
                "name": "Slugga",
                "bs": 5,
                "strength": 4,
                "ap": 0,
                "damage": 1
            }
        }
    },
}