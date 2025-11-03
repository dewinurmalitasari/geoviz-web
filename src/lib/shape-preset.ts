import type {Point} from "@/type.ts";

// 2D Shape Presets
export const PRESETS_2D = {
    "custom": "Kustom",
    "triangle": "Segitiga",
    "square": "Persegi",
    "rectangle": "Persegi Panjang",
    "pentagon": "Segilima",
    "hexagon": "Segienam",
    "arrow": "Panah"
} as const;

// 3D Shape Presets
export const PRESETS_3D = {
    "custom": "Kustom",
    "cube": "Kubus",
    "pyramid": "Piramida",
    "prism": "Prisma Segitiga",
    "plane": "Bidang 3D"
} as const;

// Preset point values
export const PRESET_POINTS: Record<string, Point[]> = {
    // 2D Presets
    "triangle": [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 2, y: 3}
    ],
    "square": [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 3, y: 3},
        {x: 1, y: 3}
    ],
    "rectangle": [
        {x: 1, y: 1},
        {x: 4, y: 1},
        {x: 4, y: 2},
        {x: 1, y: 2}
    ],
    "pentagon": [
        {x: 2, y: 1},
        {x: 3, y: 2},
        {x: 2, y: 3},
        {x: 1, y: 3},
        {x: 0, y: 2}
    ],
    "hexagon": [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 2},
        {x: 2, y: 3},
        {x: 1, y: 3},
        {x: 0, y: 2}
    ],
    "arrow": [
        {x: 1, y: 2},
        {x: 2, y: 2},
        {x: 2, y: 1},
        {x: 4, y: 3},
        {x: 2, y: 5},
        {x: 2, y: 4},
        {x: 1, y: 4}
    ],

    // 3D Presets
    "cube": [
        {x: 1, y: 1, z: 1},
        {x: 3, y: 1, z: 1},
        {x: 3, y: 3, z: 1},
        {x: 1, y: 3, z: 1},
        {x: 1, y: 1, z: 3},
        {x: 3, y: 1, z: 3},
        {x: 3, y: 3, z: 3},
        {x: 1, y: 3, z: 3}
    ],
    "pyramid": [
        {x: 2, y: 1, z: 2},  // Apex
        {x: 1, y: 3, z: 1},  // Base corner 1
        {x: 3, y: 3, z: 1},  // Base corner 2
        {x: 3, y: 3, z: 3},  // Base corner 3
        {x: 1, y: 3, z: 3}   // Base corner 4
    ],
    "prism": [
        {x: 1, y: 1, z: 1},
        {x: 3, y: 1, z: 1},
        {x: 2, y: 1, z: 3},
        {x: 1, y: 3, z: 1},
        {x: 3, y: 3, z: 1},
        {x: 2, y: 3, z: 3}
    ],
    "plane": [
        {x: 1, y: 1, z: 1},
        {x: 3, y: 1, z: 1},
        {x: 3, y: 1, z: 3},
        {x: 1, y: 1, z: 3}
    ]
};