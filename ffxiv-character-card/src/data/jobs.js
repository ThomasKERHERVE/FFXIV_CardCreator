// All FFXIV jobs grouped by category > role.
// Each job's `id` is also its icon filename: /public/icons/{id}.png
// e.g. /public/icons/dark-knight.png

export const CATEGORIES = [
  {
    category: "Combat",
    roles: [
      {
        role: "Tank",
        color: "#4a90d9",
        jobs: [
          { id: "paladin", name: "Paladin", abbr: "PLD" },
          { id: "warrior", name: "Warrior", abbr: "WAR" },
          { id: "dark-knight", name: "Dark Knight", abbr: "DRK" },
          { id: "gunbreaker", name: "Gunbreaker", abbr: "GNB" },
        ],
      },
      {
        role: "Healer",
        color: "#5bbf6e",
        jobs: [
          { id: "white-mage", name: "White Mage", abbr: "WHM" },
          { id: "scholar", name: "Scholar", abbr: "SCH" },
          { id: "astrologian", name: "Astrologian", abbr: "AST" },
          { id: "sage", name: "Sage", abbr: "SGE" },
        ],
      },
      {
        role: "Ranged DPS",
        color: "#d4a035",
        jobs: [
          { id: "bard", name: "Bard", abbr: "BRD" },
          { id: "machinist", name: "Machinist", abbr: "MCH" },
          { id: "dancer", name: "Dancer", abbr: "DNC" },
        ],
      },
      {
        role: "Caster DPS",
        color: "#9b59b6",
        jobs: [
          { id: "black-mage", name: "Black Mage", abbr: "BLM" },
          { id: "summoner", name: "Summoner", abbr: "SMN" },
          { id: "red-mage", name: "Red Mage", abbr: "RDM" },
          { id: "pictomancer", name: "Pictomancer", abbr: "PCT" },
          { id: "blue-mage", name: "Blue Mage", abbr: "BLU" },
        ],
      },
      {
        role: "Melee DPS",
        color: "#c94f4f",
        jobs: [
          { id: "monk", name: "Monk", abbr: "MNK" },
          { id: "dragoon", name: "Dragoon", abbr: "DRG" },
          { id: "ninja", name: "Ninja", abbr: "NIN" },
          { id: "samurai", name: "Samurai", abbr: "SAM" },
          { id: "reaper", name: "Reaper", abbr: "RPR" },
          { id: "viper", name: "Viper", abbr: "VPR" },
        ],
      },
    ],
  },
  {
    category: "Gatherer",
    roles: [
      {
        role: "Gatherer",
        color: "#4aab8a",
        jobs: [
          { id: "miner", name: "Miner", abbr: "MIN" },
          { id: "botanist", name: "Botanist", abbr: "BTN" },
          { id: "fisher", name: "Fisher", abbr: "FSH" },
        ],
      },
    ],
  },
  {
    category: "Crafter",
    roles: [
      {
        role: "Crafter",
        color: "#e07b54",
        jobs: [
          { id: "carpenter", name: "Carpenter", abbr: "CRP" },
          { id: "blacksmith", name: "Blacksmith", abbr: "BSM" },
          { id: "armorer", name: "Armorer", abbr: "ARM" },
          { id: "goldsmith", name: "Goldsmith", abbr: "GSM" },
          { id: "leatherworker", name: "Leatherworker", abbr: "LTW" },
          { id: "weaver", name: "Weaver", abbr: "WVR" },
          { id: "alchemist", name: "Alchemist", abbr: "ALC" },
          { id: "culinarian", name: "Culinarian", abbr: "CUL" },
        ],
      },
    ],
  },
];

// High-end / high-difficulty content of FFXIV, shown on the right side of the
// card. Same icon convention: /public/icons/{id}.png with abbr text fallback.
export const CONTENT_GROUPS = [
  {
    role: "Raids",
    color: "#c0392b",
    jobs: [
      { id: "savage", name: "Savage", abbr: "SAV" },
      { id: "ultimate", name: "Ultimate", abbr: "ULT" },
      { id: "criterion", name: "Criterion Savage", abbr: "CRT" },
      { id: "chaotic", name: "Chaotic Alliance Raid", abbr: "CHA" },
    ],
  },
  {
    role: "Trials",
    color: "#8e44ad",
    jobs: [
      { id: "extreme", name: "Extreme Trial", abbr: "EX" },
      { id: "unreal", name: "Unreal Trial", abbr: "UNR" },
    ],
  },
  {
    role: "PvP",
    color: "#2980b9",
    jobs: [
      { id: "crystalline-conflict", name: "Crystalline Conflict", abbr: "CC" },
      { id: "frontline", name: "Frontline", abbr: "FL" },
      { id: "rival-wings", name: "Rival Wings", abbr: "RW" },
    ],
  },
  {
    role: "Exploration",
    color: "#16a085",
    jobs: [
      { id: "Eureka", name: "Eureka's Islands", abbr: "Eureka" },
      { id: "Bozja", name: "Field Operations (Bozja / Zadnor)", abbr: "Bozja" },
      { id: "OCC", name: "Occult Cressent", abbr: "OCC" },
    ],
  },
  {
    role: "Deep Dungeon",
    color: "#9b128f",
    jobs: [
      { id: "POTD", name: "Deep Dungeon", abbr: "POTD" },
      { id: "HOH", name: "Deep Dungeon", abbr: "HOH" },
      { id: "EO", name: "Deep Dungeon", abbr: "EO" },
      { id: "PT", name: "Deep Dungeon", abbr: "PT" },
    ],
  },
];