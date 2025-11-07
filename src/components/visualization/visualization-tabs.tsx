import {useMemo} from "react";
import {
    type DilatationValue,
    type Point,
    type ReflectionValue,
    type RotationValue,
    TRANSFORMATION_TYPES,
    type TranslationValue,
    VISUALIZATION_TYPES
} from "@/type.ts";
import {FlipHorizontal, Move, Play, RotateCw, ZoomIn} from "lucide-react";
import GeoInput from "@/components/geo/geo-input.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import GeoSelect from "@/components/geo/geo-select.tsx";

interface VisualizationTabsProps {
    visualizationType: string;
    translationValue: TranslationValue;
    setTranslationValue: (value: TranslationValue) => void;
    dilatationValue: DilatationValue;
    setDilatationValue: (value: DilatationValue) => void;
    rotationValue: RotationValue;
    setRotationValue: (value: RotationValue) => void;
    reflectionAxis: ReflectionValue;
    setReflectionAxis: (value: ReflectionValue) => void;
    shapePoints: Point[];
    onStartVisualization: (type: string) => void;
}

export function useVisualizationTabs(
    {
        visualizationType,
        translationValue,
        setTranslationValue,
        dilatationValue,
        setDilatationValue,
        rotationValue,
        setRotationValue,
        reflectionAxis,
        setReflectionAxis,
        shapePoints,
        onStartVisualization
    }: VisualizationTabsProps) {
    const reflectionOptions = visualizationType === VISUALIZATION_TYPES.SHAPE_3D
        ? [
            {value: 'radio-xy-plane', label: 'Bidang XY'},
            {value: 'radio-xz-plane', label: 'Bidang XZ'},
            {value: 'radio-yz-plane', label: 'Bidang YZ'},
        ]
        : [
            {value: 'origin', label: 'Sumbu Asal'},
            {value: 'x-axis', label: 'Sumbu X'},
            {value: 'y-axis', label: 'Sumbu Y'},
            {value: 'line-y-x', label: 'Garis Y=X'},
            {value: 'line-y-neg-x', label: 'Garis Y=-X'},
            {value: 'line-y-k', label: 'Garis Y=K'},
            {value: 'line-x-k', label: 'Garis X=K'},
        ];

    return useMemo(() => [
        {
            value: TRANSFORMATION_TYPES.TRANSLATION,
            label: TRANSFORMATION_TYPES.TRANSLATION.translateTransformationType(),
            icon: <Move/>,
            content: (
                <div className="p-4 rounded-lg border border-deep-purple-200 space-y-2">
                    <h3 className="text-lg font-bold">
                        Masukkan Nilai Translasi
                    </h3>

                    <div
                        className="flex items-center justify-between md:space-x-4 space-x-0 md:flex-row flex-col md:space-y-0 space-y-2">
                        <div className="flex items-center space-x-4">
                            <GeoInput
                                id="translate-x"
                                icon="X"
                                value={translationValue.translateX}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setTranslationValue({
                                        ...translationValue,
                                        translateX: isNaN(value) ? 0 : value
                                    });
                                }}
                                type="number"
                            />

                            <GeoInput
                                id="translate-y"
                                icon="Y"
                                value={translationValue.translateY}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setTranslationValue({
                                        ...translationValue,
                                        translateY: isNaN(value) ? 0 : value
                                    });
                                }}
                                type="number"
                            />

                            {visualizationType === VISUALIZATION_TYPES.SHAPE_3D && (
                                <GeoInput
                                    id="translate-z"
                                    icon="Z"
                                    value={translationValue?.translateZ || 0}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        setTranslationValue({
                                            ...translationValue,
                                            translateZ: isNaN(value) ? 0 : value
                                        });
                                    }}
                                    type="number"
                                />
                            )}
                        </div>

                        <GeoButton
                            variant="primary"
                            onClick={() => onStartVisualization(TRANSFORMATION_TYPES.TRANSLATION)}
                            className="w-full md:w-fit"
                        >
                            <Play/> Mulai Visualisasi
                        </GeoButton>
                    </div>
                </div>
            )
        },
        {
            value: TRANSFORMATION_TYPES.DILATATION,
            label: TRANSFORMATION_TYPES.DILATATION.translateTransformationType(),
            icon: <ZoomIn/>,
            content: (
                <div className="p-4 rounded-lg border border-deep-purple-200 space-y-2">
                    <h3 className="text-lg font-bold">
                        Masukkan Nilai Dilatasi
                    </h3>

                    <div
                        className="flex items-center justify-between md:space-x-4 space-x-0 md:flex-row flex-col md:space-y-0 space-y-2">
                        <GeoInput
                            id="scale-factor"
                            icon="Skala"
                            value={dilatationValue.scaleFactor}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                setDilatationValue({
                                    ...dilatationValue,
                                    scaleFactor: isNaN(value) ? 1 : value
                                });
                            }}
                            type="number"
                        />

                        <GeoButton
                            variant="primary"
                            onClick={() => onStartVisualization(TRANSFORMATION_TYPES.DILATATION)}
                            className="w-full md:w-fit"
                        >
                            <Play/> Mulai Visualisasi
                        </GeoButton>
                    </div>
                </div>
            )
        },
        {
            value: TRANSFORMATION_TYPES.ROTATION,
            label: TRANSFORMATION_TYPES.ROTATION.translateTransformationType(),
            icon: <RotateCw/>,
            content: (
                <div className="p-4 rounded-lg border border-deep-purple-200 space-y-2">
                    <h3 className="text-lg font-bold">
                        Masukkan Nilai Rotasi
                    </h3>

                    <div
                        className="flex items-center justify-between md:space-x-4 space-x-0 md:flex-row flex-col md:space-y-0 space-y-2">
                        <GeoInput
                            id="angle"
                            icon="Sudut"
                            value={rotationValue.angle}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                setRotationValue({
                                    ...rotationValue,
                                    angle: isNaN(value) ? 0 : value
                                });
                            }}
                            type="number"
                        />

                        {visualizationType === VISUALIZATION_TYPES.SHAPE_3D && (
                            <GeoSelect
                                id="rotation-axis"
                                value={rotationValue.axis || 'radio_x_axis'}
                                onValueChange={(value) => {
                                    setRotationValue({
                                        ...rotationValue,
                                        axis: value as RotationValue['axis']
                                    });
                                }}
                                options={[
                                    {value: 'radio_x_axis', label: 'Sumbu X'},
                                    {value: 'radio_y_axis', label: 'Sumbu Y'},
                                    {value: 'radio_z_axis', label: 'Sumbu Z'},
                                ]}
                            />
                        )}

                        <GeoButton
                            variant="primary"
                            onClick={() => onStartVisualization(TRANSFORMATION_TYPES.ROTATION)}
                            className="w-full md:w-fit"
                        >
                            <Play/> Mulai Visualisasi
                        </GeoButton>
                    </div>
                </div>
            )
        },
        {
            value: TRANSFORMATION_TYPES.REFLECTION,
            label: TRANSFORMATION_TYPES.REFLECTION.translateTransformationType(),
            icon: <FlipHorizontal/>,
            content: (
                <div className="p-4 rounded-lg border border-deep-purple-200 space-y-2">
                    <h3 className="text-lg font-bold">
                        Masukkan Nilai Refleksi
                    </h3>

                    <div
                        className="flex items-center justify-between md:space-x-4 space-x-0 md:flex-row flex-col md:space-y-0 space-y-2">
                        <GeoSelect
                            id="axis"
                            value={reflectionAxis.axis || 'x'}
                            onValueChange={(value) => {
                                setReflectionAxis({
                                    ...reflectionAxis,
                                    axis: value as ReflectionValue['axis']
                                });
                            }}
                            options={reflectionOptions}
                        />

                        {(reflectionAxis.axis === 'line-y-k' || reflectionAxis.axis === 'line-x-k') && (
                            <GeoInput
                                id="k-value"
                                icon="K"
                                value={reflectionAxis?.k || 0}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setReflectionAxis({
                                        ...reflectionAxis,
                                        k: isNaN(value) ? 0 : value
                                    });
                                }}
                                type="number"
                            />
                        )}

                        <GeoButton
                            variant="primary"
                            onClick={() => onStartVisualization(TRANSFORMATION_TYPES.REFLECTION)}
                            className="w-full md:w-fit"
                        >
                            <Play/> Mulai Visualisasi
                        </GeoButton>
                    </div>
                </div>
            )
        }
    ], [visualizationType, translationValue, dilatationValue, rotationValue, reflectionAxis, shapePoints])
}