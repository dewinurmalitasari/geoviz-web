// [File: components/visualization/equation-input.tsx]

import GeoButton from "@/components/geo/geo-button.tsx";
import GeoInput from "@/components/geo/geo-input.tsx";
import { Minus, Plus, Baseline } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import GeoTabs from "@/components/geo/geo-tabs.tsx";

// Define the different equation states
type ExplicitState = { type: 'explicit', equations: string[] };
type ParametricState = { type: 'parametric', x: string, y: string };
type PolarState = { type: 'polar', r: string };
type ImplicitState = { type: 'implicit', fxy: string };

// Export a union type for the parent component to use
export type EquationState = ExplicitState | ParametricState | PolarState | ImplicitState;

interface EquationInputProps {
    equationState: EquationState;
    onEquationStateChange: (newState: EquationState) => void;
    maxEquations?: number; // Max for explicit
    minEquations?: number; // Min for explicit
    className?: string;
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
}

// TODO: Add button for adding like exponential, logarithmic, symbols, etc.
export default function EquationInput(
    {
        equationState,
        onEquationStateChange,
        maxEquations = 5,
        minEquations = 1,
        className,
        colorScheme = "purple",
    }: EquationInputProps) {

    // --- Logic for EXPLICIT (y = f(x)) type ---
    const addEquation = () => {
        if (equationState.type === 'explicit' && equationState.equations.length < maxEquations) {
            onEquationStateChange({
                ...equationState,
                equations: [...equationState.equations, '']
            });
        }
    };

    const removeEquation = (index: number) => {
        if (equationState.type === 'explicit' && equationState.equations.length > minEquations) {
            onEquationStateChange({
                ...equationState,
                equations: equationState.equations.filter((_, i) => i !== index)
            });
        }
    };

    const handleEquationChange = (index: number, value: string) => {
        if (equationState.type === 'explicit') {
            onEquationStateChange({
                ...equationState,
                equations: equationState.equations.map((eq, i) => (i === index ? value : eq))
            });
        }
    };

    // --- Tab Change Handler ---
    const handleTypeChange = (newType: string) => {
        if (newType === equationState.type) return;

        switch (newType) {
            case 'explicit':
                onEquationStateChange({ type: 'explicit', equations: ['x^2'] });
                break;
            case 'parametric':
                onEquationStateChange({ type: 'parametric', x: 'cos(t)', y: 'sin(t)' });
                break;
            case 'polar':
                onEquationStateChange({ type: 'polar', r: '1 + cos(theta)' });
                break;
            case 'implicit':
                onEquationStateChange({ type: 'implicit', fxy: 'x^2 + y^2 - 4' });
                break;
        }
    };

    const tabs = [
        {
            value: 'explicit',
            label: 'Eksplisit (y=f(x))',
            content: (
                <div className="pt-2 space-y-3">
                    {equationState.type === 'explicit' && equationState.equations.map((equation, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-center gap-2 flex-1">
                                <GeoInput
                                    id={`equation-${index}`}
                                    label="y ="
                                    value={equation}
                                    onChange={(e) => handleEquationChange(index, e.target.value)}
                                    icon={<Baseline className="w-4 h-4 text-gray-500" />}
                                    className="flex-1"
                                    type="text"
                                />
                            </div>
                            <GeoButton
                                variant="outline"
                                onClick={() => removeEquation(index)}
                                disabled={equationState.equations.length <= minEquations}
                                className="h-9 w-9 p-0 shrink-0"
                                colorScheme={colorScheme}
                            >
                                <Minus className="w-4 h-4" />
                            </GeoButton>
                        </div>
                    ))}
                    {equationState.type === 'explicit' && (
                        <GeoButton
                            variant="outline"
                            onClick={addEquation}
                            disabled={equationState.equations.length >= maxEquations}
                            className="w-full h-fit"
                            colorScheme={colorScheme}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Persamaan {equationState.equations.length >= maxEquations && `(Maks: ${maxEquations})`}
                        </GeoButton>
                    )}
                </div>
            )
        },
        {
            value: 'parametric',
            label: 'Parametrik',
            content: (
                <div className="pt-2 space-y-3">
                    {equationState.type === 'parametric' && <>
                        <GeoInput
                            id="parametric-x"
                            label="x(t) ="
                            value={equationState.x}
                            onChange={(e) => onEquationStateChange({ ...equationState, x: e.target.value })}
                            type="text"
                        />
                        <GeoInput
                            id="parametric-y"
                            label="y(t) ="
                            value={equationState.y}
                            onChange={(e) => onEquationStateChange({ ...equationState, y: e.target.value })}
                            type="text"
                        />
                    </>}
                </div>
            )
        },
        {
            value: 'polar',
            label: 'Polar',
            content: (
                <div className="pt-2 space-y-3">
                    {equationState.type === 'polar' &&
                        <GeoInput
                            id="polar-r"
                            label="r(theta) ="
                            value={equationState.r}
                            onChange={(e) => onEquationStateChange({ ...equationState, r: e.target.value })}
                            type="text"
                        />
                    }
                </div>
            )
        },
        {
            value: 'implicit',
            label: 'Implisit',
            content: (
                <div className="pt-2 space-y-3">
                    {equationState.type === 'implicit' &&
                        <GeoInput
                            id="implicit-fxy"
                            label="f(x, y) = 0"
                            value={equationState.fxy}
                            onChange={(e) => onEquationStateChange({ ...equationState, fxy: e.target.value })}
                            type="text"
                        />
                    }
                </div>
            )
        },
    ];

    return (
        <div className={cn("space-y-4", className)}>
            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
                Masukkan Persamaan
            </h3>

            <GeoTabs
                variant="pills"
                fullWidth
                tabs={tabs}
                defaultValue={equationState.type}
                onValueChange={handleTypeChange}
            />
        </div>
    );
}