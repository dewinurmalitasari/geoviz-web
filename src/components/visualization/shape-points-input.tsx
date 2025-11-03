// shape-points-input.tsx
import {useState} from "react";
import GeoButton from "@/components/geo/geo-button.tsx";
import GeoInput from "@/components/geo/geo-input.tsx";
import GeoSelect from "@/components/geo/geo-select.tsx";
import {Minus, Plus, Shapes} from "lucide-react";
import {cn} from "@/lib/utils.ts";


// TODO: Move definitions to a separate types file
export interface Point2D {
    x: number;
    y: number;
}

export interface Point3D extends Point2D {
    z: number;
}

export type Point = Point2D | Point3D;

// 2D Shape Presets
const PRESETS_2D = {
    "custom": "Kustom",
    "triangle": "Segitiga",
    "square": "Persegi",
    "rectangle": "Persegi Panjang",
    "pentagon": "Segilima",
    "hexagon": "Segienam",
    "arrow": "Panah"
} as const;

// 3D Shape Presets
const PRESETS_3D = {
    "custom": "Kustom",
    "cube": "Kubus",
    "pyramid": "Piramida",
    "prism": "Prisma Segitiga",
    "plane": "Bidang 3D"
} as const;

// Preset point values
const PRESET_POINTS: Record<string, Point[]> = {
    // 2D Presets
    "triangle": [
        {x: 0, y: 0},
        {x: 50, y: 0},
        {x: 25, y: 50}
    ],
    "square": [
        {x: 0, y: 0},
        {x: 50, y: 0},
        {x: 50, y: 50},
        {x: 0, y: 50}
    ],
    "rectangle": [
        {x: 0, y: 0},
        {x: 80, y: 0},
        {x: 80, y: 40},
        {x: 0, y: 40}
    ],
    "pentagon": [
        {x: 25, y: 0},
        {x: 50, y: 20},
        {x: 40, y: 50},
        {x: 10, y: 50},
        {x: 0, y: 20}
    ],
    "hexagon": [
        {x: 20, y: 0},
        {x: 40, y: 0},
        {x: 50, y: 25},
        {x: 40, y: 50},
        {x: 20, y: 50},
        {x: 10, y: 25}
    ],
    "arrow": [
        {x: 0, y: 25},
        {x: 30, y: 25},
        {x: 30, y: 10},
        {x: 50, y: 35},
        {x: 30, y: 60},
        {x: 30, y: 45},
        {x: 0, y: 45}
    ],

    // 3D Presets
    "cube": [
        {x: 0, y: 0, z: 0},
        {x: 50, y: 0, z: 0},
        {x: 50, y: 50, z: 0},
        {x: 0, y: 50, z: 0},
        {x: 0, y: 0, z: 50},
        {x: 50, y: 0, z: 50},
        {x: 50, y: 50, z: 50},
        {x: 0, y: 50, z: 50}
    ],
    "pyramid": [
        {x: 25, y: 0, z: 25},  // Apex
        {x: 0, y: 50, z: 0},   // Base corner 1
        {x: 50, y: 50, z: 0},  // Base corner 2
        {x: 50, y: 50, z: 50}, // Base corner 3
        {x: 0, y: 50, z: 50}   // Base corner 4
    ],
    "prism": [
        {x: 0, y: 0, z: 0},
        {x: 50, y: 0, z: 0},
        {x: 25, y: 0, z: 50},
        {x: 0, y: 50, z: 0},
        {x: 50, y: 50, z: 0},
        {x: 25, y: 50, z: 50}
    ],
    "plane": [
        {x: 0, y: 0, z: 0},
        {x: 50, y: 0, z: 0},
        {x: 50, y: 0, z: 50},
        {x: 0, y: 0, z: 50}
    ]
};

interface ShapePointsInputProps {
    onPointsChange?: (points: Point[]) => void;
    dimension?: "2d" | "3d";
    initialPoints?: Point[];
    maxPoints?: number;
    minPoints?: number;
    className?: string;
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
}

export default function ShapePointsInput(
    {
        onPointsChange,
        dimension = "2d",
        initialPoints = [{x: 0, y: 0}],
        maxPoints = 10,
        minPoints = 1,
        className,
        colorScheme = "purple"
    }: ShapePointsInputProps) {
    const [points, setPoints] = useState<Point[]>(initialPoints);
    const [selectedPreset, setSelectedPreset] = useState<string>("custom");

    const presets = dimension === "3d" ? PRESETS_3D : PRESETS_2D;
    const presetOptions = Object.entries(presets).map(([value, label]) => ({
        value,
        label
    }));

    const updatePoints = (newPoints: Point[]) => {
        setPoints(newPoints);
        onPointsChange?.(newPoints);
    };

    const handlePresetChange = (presetKey: string) => {
        setSelectedPreset(presetKey);

        if (presetKey === "custom") {
            // Reset to a single point for custom mode
            const defaultPoint = dimension === "3d" ? {x: 0, y: 0, z: 0} : {x: 0, y: 0};
            updatePoints([defaultPoint]);
        } else {
            // Apply preset points
            const presetPoints = PRESET_POINTS[presetKey] || [];
            updatePoints([...presetPoints]);
        }
    };

    const addPoint = () => {
        if (points.length < maxPoints) {
            const newPoint = dimension === "3d"
                ? {x: 0, y: 0, z: 0}
                : {x: 0, y: 0};
            const newPoints = [...points, newPoint];
            setSelectedPreset("custom"); // Switch to custom when user modifies
            updatePoints(newPoints);
        }
    };

    const removePoint = (index: number) => {
        if (points.length > minPoints) {
            const newPoints = points.filter((_, i) => i !== index);
            setSelectedPreset("custom"); // Switch to custom when user modifies
            updatePoints(newPoints);
        }
    };

    const updatePoint = (index: number, field: keyof Point, value: string) => {
        const numValue = parseFloat(value) || 0;
        const newPoints = points.map((point, i) =>
            i === index ? {...point, [field]: numValue} : point
        );
        setSelectedPreset("custom"); // Switch to custom when user modifies
        updatePoints(newPoints);
    };

    const getPointLabel = (index: number) => {
        return String.fromCharCode(65 + index); // A, B, C, ...
    };

    return (
        <div className={cn("space-y-4", className)}>
            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
                Input Titik Bangun
            </h3>

            {/* Shape Preset Selector */}
            <GeoSelect
                id="shape-preset"
                label="Pilih Bentuk"
                value={selectedPreset}
                onValueChange={handlePresetChange}
                options={presetOptions}
                icon={<Shapes className="w-4 h-4"/>}
                placeholder="Pilih bentuk..."
                colorScheme={colorScheme}
            />

            {/* Points Input */}
            <div className="space-y-3">
                {points.map((point, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                        <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-6">
                            {getPointLabel(index)}
                        </span>

                        <div className="flex items-center gap-2 flex-1">
                            <GeoInput
                                id={`point-${index}-x`}
                                value={point.x.toString()}
                                onChange={(e) => updatePoint(index, "x", e.target.value)}
                                icon={<span className="text-xs font-bold">X</span>}
                                className="flex-1"
                            />

                            <GeoInput
                                id={`point-${index}-y`}
                                value={point.y.toString()}
                                onChange={(e) => updatePoint(index, "y", e.target.value)}
                                icon={<span className="text-xs font-bold">Y</span>}
                                className="flex-1"
                            />

                            {dimension === "3d" && (
                                <GeoInput
                                    id={`point-${index}-z`}
                                    value={(point as Point3D).z.toString()}
                                    onChange={(e) => updatePoint(index, "z", e.target.value)}
                                    icon={<span className="text-xs font-bold">Z</span>}
                                    className="flex-1"
                                />
                            )}
                        </div>

                        <GeoButton
                            variant="outline"
                            onClick={() => removePoint(index)}
                            disabled={points.length <= minPoints || selectedPreset !== "custom"}
                            className="h-9 w-9 p-0 shrink-0"
                            colorScheme={colorScheme}
                        >
                            <Minus className="w-4 h-4"/>
                        </GeoButton>
                    </div>
                ))}
            </div>

            {/* Add Point Button */}
            <GeoButton
                variant="outline"
                onClick={addPoint}
                disabled={points.length >= maxPoints || selectedPreset !== "custom"}
                className="w-full h-fit"
                colorScheme={colorScheme}
            >
                <Plus className="w-4 h-4 mr-2"/>
                Tambah Titik {points.length >= maxPoints && `(Maks: ${maxPoints})`}
            </GeoButton>

            {/* Points Summary */}
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {points.length} titik {dimension === "3d" ? "3D" : "2D"} terdefinisi
                {selectedPreset !== "custom" && ` • ${presets[selectedPreset as keyof typeof presets]}`}
            </div>

            {/* Preset Info */}
            {selectedPreset !== "custom" && (
                <div
                    className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                        Menggunakan preset <strong>{presets[selectedPreset as keyof typeof presets]}</strong>.
                        Pilih "Kustom" untuk mengedit titik secara manual.
                    </p>
                </div>
            )}
        </div>
    );
}