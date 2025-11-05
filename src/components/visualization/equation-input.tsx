import {useState} from "react";
import GeoButton from "@/components/geo/geo-button.tsx";
import GeoInput from "@/components/geo/geo-input.tsx";
import {Minus, Plus, Baseline} from "lucide-react";
import {cn} from "@/lib/utils.ts";

interface EquationInputProps {
    onEquationsChange?: (equations: string[]) => void;
    maxEquations?: number;
    minEquations?: number;
    className?: string;
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
    defaultEquations?: string[];
}

export default function EquationInput(
    {
        onEquationsChange,
        maxEquations = 5,
        minEquations = 1,
        className,
        colorScheme = "purple",
        defaultEquations = ['']
    }: EquationInputProps) {

    const [equations, setEquations] = useState<string[]>(defaultEquations);

    const updateEquations = (newEquations: string[]) => {
        setEquations(newEquations);
        onEquationsChange?.(newEquations);
    };

    const addEquation = () => {
        if (equations.length < maxEquations) {
            const newEquations = [...equations, ''];
            updateEquations(newEquations);
        }
    };

    const removeEquation = (index: number) => {
        if (equations.length > minEquations) {
            const newEquations = equations.filter((_, i) => i !== index);
            updateEquations(newEquations);
        }
    };

    const handleEquationChange = (index: number, value: string) => {
        const newEquations = equations.map((eq, i) => (i === index ? value : eq));
        updateEquations(newEquations);
    };

    return (
        <div className={cn("space-y-4", className)}>
            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
                Masukkan Persamaan y = f(x)
            </h3>

            <div className="space-y-3">
                {equations.map((equation, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center gap-2 flex-1">
                            <GeoInput
                                id={`equation-${index}`}
                                value={equation}
                                onChange={(e) => handleEquationChange(index, e.target.value)}
                                icon={<Baseline className="w-4 h-4 text-gray-500"/>}
                                className="flex-1"
                                type="text"
                            />
                        </div>

                        <GeoButton
                            variant="outline"
                            onClick={() => removeEquation(index)}
                            disabled={equations.length <= minEquations}
                            className="h-9 w-9 p-0 shrink-0"
                            colorScheme={colorScheme}
                        >
                            <Minus className="w-4 h-4"/>
                        </GeoButton>
                    </div>
                ))}
            </div>

            <GeoButton
                variant="outline"
                onClick={addEquation}
                disabled={equations.length >= maxEquations}
                className="w-full h-fit"
                colorScheme={colorScheme}
            >
                <Plus className="w-4 h-4 mr-2"/>
                Tambah Persamaan {equations.length >= maxEquations && `(Maks: ${maxEquations})`}
            </GeoButton>

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {equations.length} persamaan terdefinisi
            </div>
        </div>
    );
}