import {useEffect, useMemo, useState} from "react";
import {
    type DilatationValue,
    type ReflectionValue,
    type RotationValue,
    type Transformation,
    TRANSFORMATION_TYPES,
    type TranslationValue,
    VISUALIZATION_TYPES
} from "@/type.ts";
import {FlipHorizontal, Move, Plus, Replace, RotateCw, ZoomIn} from "lucide-react";
import GeoInput from "@/components/geo/geo-input.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import GeoSelect from "@/components/geo/geo-select.tsx";

interface VisualizationTabsProps {
    visualizationType: string;
    setTransformations: (transformations: (prevTransformations: Transformation[]) => Transformation[]) => void;
}

export function useVisualizationTabs(
    {
        visualizationType,
        setTransformations
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

    const [translationValue, setTranslationValue] = useState<TranslationValue>({
        translateX: 3,
        translateY: 3,
        ...(visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? {translateZ: 3} : {})
    });

    const [dilatationValue, setDilatationValue] = useState<DilatationValue>({
        scaleFactor: 4,
    });

    const [rotationValue, setRotationValue] = useState<RotationValue>({
        angle: 90,
        ...(visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? {axis: 'radio_x_axis'} : {})
    });

    const [reflectionValue, setReflectionValue] = useState<ReflectionValue>({
        axis: visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? 'radio-xy-plane' : 'y-axis',
    });

    // Reset transformations to default values when visualizationType changes
    useEffect(() => {
        setTranslationValue({
            translateX: 3,
            translateY: 3,
            ...(visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? {translateZ: 3} : {})
        });
        setDilatationValue({scaleFactor: 4});
        setRotationValue({
            angle: 90,
            ...(visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? {axis: 'radio_x_axis'} : {})
        });
        setReflectionValue({
            axis: visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? 'radio-xy-plane' : 'y-axis',
        });
    }, [visualizationType]);

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
                        <div className="flex items-center space-x-4 w-full">
                            <GeoInput
                                id="translate-x"
                                icon="X ="
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
                                icon="Y ="
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
                                    icon="Z ="
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

                        <div className="w-full md:w-fit flex flex-col md:flex-row space-x-2 md:space-y-0 space-y-2">
                            <GeoButton
                                variant="secondary"
                                onClick={() => {
                                    setTransformations(() => [{
                                        type: TRANSFORMATION_TYPES.TRANSLATION,
                                        value: translationValue,
                                    }]);
                                }}
                                className="w-full md:w-fit"
                            >
                                <Replace/> Timpa Transformasi
                            </GeoButton>

                            <GeoButton
                                variant="primary"
                                onClick={() => {
                                    setTransformations((prevTransformations) => [
                                        ...prevTransformations,
                                        {
                                            type: TRANSFORMATION_TYPES.TRANSLATION,
                                            value: translationValue,
                                        },
                                    ]);
                                }}
                                className="w-full md:w-fit"
                            >
                                <Plus/> Tambah Transformasi
                            </GeoButton>
                        </div>
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
                                    scaleFactor: isNaN(value) ? 1 : value
                                });
                            }}
                            type="number"
                        />

                        <div className="w-full md:w-fit flex flex-col md:flex-row space-x-2 md:space-y-0 space-y-2">
                            <GeoButton
                                variant="secondary"
                                onClick={() => {
                                    setTransformations(() => [{
                                        type: TRANSFORMATION_TYPES.DILATATION,
                                        value: dilatationValue,
                                    }]);
                                }}
                                className="w-full md:w-fit"
                            >
                                <Replace/> Timpa Transformasi
                            </GeoButton>

                            <GeoButton
                                variant="primary"
                                onClick={() => {
                                    setTransformations((prevTransformations) => [
                                        ...prevTransformations,
                                        {
                                            type: TRANSFORMATION_TYPES.DILATATION,
                                            value: dilatationValue,
                                        },
                                    ]);
                                }}
                                className="w-full md:w-fit"
                            >
                                <Plus/> Tambah Transformasi
                            </GeoButton>
                        </div>
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

                        <div className="w-full md:w-fit flex flex-col md:flex-row space-x-2 md:space-y-0 space-y-2">
                            <GeoButton
                                variant="secondary"
                                onClick={() => {
                                    setTransformations(() => [{
                                        type: TRANSFORMATION_TYPES.ROTATION,
                                        value: rotationValue,
                                    }]);
                                }}
                                className="w-full md:w-fit"
                            >
                                <Replace/> Timpa Transformasi
                            </GeoButton>

                            <GeoButton
                                variant="primary"
                                onClick={() => {
                                    setTransformations((prevTransformations) => [
                                        ...prevTransformations,
                                        {
                                            type: TRANSFORMATION_TYPES.ROTATION,
                                            value: rotationValue,
                                        },
                                    ]);
                                }}
                                className="w-full md:w-fit"
                            >
                                <Plus/> Tambah Transformasi
                            </GeoButton>
                        </div>
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
                            value={reflectionValue.axis}
                            onValueChange={(value) => {
                                setReflectionValue({
                                    ...reflectionValue,
                                    axis: value as ReflectionValue['axis']
                                });
                            }}
                            options={reflectionOptions}
                        />

                        {(reflectionValue.axis === 'line-y-k' || reflectionValue.axis === 'line-x-k') && (
                            <GeoInput
                                id="k-value"
                                icon="K"
                                value={reflectionValue.k || 0}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setReflectionValue({
                                        ...reflectionValue,
                                        k: isNaN(value) ? 0 : value
                                    });
                                }}
                                type="number"
                            />
                        )}

                        <div className="w-full md:w-fit flex flex-col md:flex-row space-x-2 md:space-y-0 space-y-2">
                            <GeoButton
                                variant="secondary"
                                onClick={() => {
                                    setTransformations(() => [{
                                        type: TRANSFORMATION_TYPES.REFLECTION,
                                        value: reflectionValue,
                                    }]);
                                }}
                                className="w-full md:w-fit"
                            >
                                <Replace/> Timpa Transformasi
                            </GeoButton>

                            <GeoButton
                                variant="primary"
                                onClick={() => {
                                    setTransformations((prevTransformations) => [
                                        ...prevTransformations,
                                        {
                                            type: TRANSFORMATION_TYPES.REFLECTION,
                                            value: reflectionValue,
                                        },
                                    ]);
                                }}
                                className="w-full md:w-fit"
                            >
                                <Plus/> Tambah Transformasi
                            </GeoButton>
                        </div>
                    </div>
                </div>
            )
        }
    ], [visualizationType, setTransformations, reflectionOptions, translationValue, dilatationValue, rotationValue, reflectionValue]);
}