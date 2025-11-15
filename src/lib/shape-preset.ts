import type {Point} from "@/type.ts";

// 2D Shape Presets
export const PRESETS_2D = {
    "custom": "Kustom",
    "triangle": "Segitiga",
    "square": "Persegi",
    "rectangle": "Persegi Panjang",
    "pentagon": "Segilima",
    "hexagon": "Segienam",
    "arrow": "Panah",
    "star": "Bintang",
    "heart": "Hati",
    "cross": "Tanda Plus"
} as const;

// 3D Shape Presets
export const PRESETS_3D = {
    "custom": "Kustom",
    "cube": "Kubus",
    "pyramid": "Piramida",
    "prism": "Prisma Segitiga",
    "tetrahedron": "Tetrahedron",
    "dodecahedron": "Dodekahedron"
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
        {x: 2.5, y: 1},    // Top
        {x: 4, y: 2.3},    // Top right
        {x: 3.2, y: 4},    // Bottom right
        {x: 1.8, y: 4},    // Bottom left
        {x: 1, y: 2.3}     // Top left
    ],
    "hexagon": [
        {x: 1.5, y: 1},
        {x: 2.5, y: 1},
        {x: 3, y: 2},
        {x: 2.5, y: 3},
        {x: 1.5, y: 3},
        {x: 1, y: 2}
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
    "star": [
        {x: 2.5, y: 1},    // Top point
        {x: 3, y: 3},      // Right top
        {x: 5, y: 3},      // Right outer
        {x: 3.5, y: 4},    // Right inner
        {x: 4, y: 6},      // Bottom right
        {x: 2.5, y: 5},    // Bottom center
        {x: 1, y: 6},      // Bottom left
        {x: 1.5, y: 4},    // Left inner
        {x: 0, y: 3},      // Left outer
        {x: 2, y: 3}       // Left top
    ],
    "heart": [
        {x: 2.5, y: 1.5},
        {x: 3, y: 1},
        {x: 4, y: 1.5},
        {x: 4, y: 2.5},
        {x: 3.5, y: 3.5},
        {x: 2.5, y: 4.5},
        {x: 1.5, y: 3.5},
        {x: 1, y: 2.5},
        {x: 1, y: 1.5},
        {x: 2, y: 1}
    ],
    "cross": [
        {x: 2, y: 1},
        {x: 3, y: 1},
        {x: 3, y: 2},
        {x: 4, y: 2},
        {x: 4, y: 3},
        {x: 3, y: 3},
        {x: 3, y: 4},
        {x: 2, y: 4},
        {x: 2, y: 3},
        {x: 1, y: 3},
        {x: 1, y: 2},
        {x: 2, y: 2}
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
    "octahedron": [
        {x: 2, y: 1, z: 2},  // Top
        {x: 1, y: 2, z: 1},  // Front left
        {x: 3, y: 2, z: 1},  // Front right
        {x: 3, y: 2, z: 3},  // Back right
        {x: 1, y: 2, z: 3},  // Back left
        {x: 2, y: 3, z: 2}   // Bottom
    ],
    "prism": [
        {x: 1, y: 1, z: 1},
        {x: 3, y: 1, z: 1},
        {x: 2, y: 1, z: 3},
        {x: 1, y: 3, z: 1},
        {x: 3, y: 3, z: 1},
        {x: 2, y: 3, z: 3}
    ],
    "tetrahedron": [
        {x: 2, y: 1, z: 2},  // Top
        {x: 1, y: 3, z: 1},  // Base corner 1
        {x: 3, y: 3, z: 1},  // Base corner 2
        {x: 2, y: 3, z: 3}   // Base corner 3
    ],
    "plane": [
        {x: 1, y: 1, z: 1},
        {x: 3, y: 1, z: 1},
        {x: 3, y: 1, z: 3},
        {x: 1, y: 1, z: 3}
    ]
};