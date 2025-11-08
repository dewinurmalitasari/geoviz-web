import PageHeader from "@/components/root/page-header.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import {useEffect, useRef, useState} from "react";
import {
    type DilatationValue,
    type DetermineValuePracticeAnswer,
    type PerformanceStats,
    type PlotlyData,
    type PlotlyLayout,
    type Point,
    type PracticePayload,
    type ReflectionValue,
    type RotationValue,
    ROUTES,
    TRANSFORMATION_TYPES,
    type TranslationValue,
    VISUALIZATION_TYPES,
} from "@/type.ts";
import {usePlotlyAnimation} from "@/hooks/use-plotly-animations.ts";
import GeoCard from "@/components/geo/geo-card.tsx";
import PlotContainer from "@/components/plot/PlotContainer.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import {Check, Minus, Play, Plus, RotateCcw} from "lucide-react";
import {useGeneratePracticeShape, useGeneratePracticeTypeAndValue} from "@/hooks/use-generate-practice.ts";
import {calculateRange} from "@/hooks/use-calculate-range.ts";
import {get2DShapePlotData, get2DShapePlotLayout} from "@/hooks/use-2d-plot.ts";
import DetermineValueInput from "@/components/practice/determine-value-input.tsx";
import GeoInput from "@/components/geo/geo-input.tsx";
import {practicesService} from "@/services/practices-service.ts";
import {toast} from "sonner";
import {useAnimatedNavigation} from "@/hooks/use-animated-navigation.ts";
import {statisticsService} from "@/services/statistics-service.ts";
import {getAuthentication} from "@/lib/auth.ts";

export default function DeterminePractice() {
    const auth = getAuthentication();
    const isMobile = useIsMobile();
    const animatedNavigate = useAnimatedNavigation();

    const [shapePoints, setShapePoints] = useState<Point[]>([])
    const [transformationType, setTransformationType] = useState<string>('')
    const [translationValue, setTranslationValue] = useState<TranslationValue>({translateX: 0, translateY: 0})
    const [dilatationValue, setDilatationValue] = useState<DilatationValue>({scaleFactor: 0})
    const [rotationValue, setRotationValue] = useState<RotationValue>({angle: 0})
    const [reflectionAxis, setReflectionAxis] = useState<ReflectionValue>({axis: 'origin', k: 0})

    const [plotData, setPlotData] = useState<PlotlyData>([])
    const [plotLayout, setPlotLayout] = useState<PlotlyLayout>({})

    const [perfStats, setPerfStats] = useState<PerformanceStats | null>(null);
    const initialRenderStartRef = useRef(0);
    const animationRenderStartRef = useRef(0);

    const visualizationType = VISUALIZATION_TYPES.SHAPE_2D
    const {startAnimation} = usePlotlyAnimation({
        shapePoints,
        visualizationType,
        isMobile,
        transformationValues: {
            translationValue,
            dilatationValue,
            rotationValue,
            reflectionAxis
        },
        setPlotData,
        setPlotLayout,
        setDilatationValue,
        onFrameTick: (stats) => {
            setPerfStats(stats);
        },
        renderStartRef: animationRenderStartRef,
    });

    const {generateTransformationType, generateTransformationValue} = useGeneratePracticeTypeAndValue()
    const {generateRandomShape} = useGeneratePracticeShape()

    const [started, setStarted] = useState(false);
    const [questionAmount, setQuestionAmount] = useState(10);
    const [userValues, setUserValues] = useState<TranslationValue | DilatationValue | RotationValue | ReflectionValue | null>(null);
    const [answers, setAnswers] = useState<DetermineValuePracticeAnswer[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (started && transformationType && shapePoints.length > 0 && shouldAnimate) {
            startAnimation(transformationType as 'translation' | 'dilatation' | 'rotation' | 'reflection')
            setShouldAnimate(false)
        }
    }, [transformationType, shapePoints, started, shouldAnimate])

    const handleGenerate = () => {
        const type = generateTransformationType()
        setTransformationType(type)
        const value = generateTransformationValue(type)

        // Set default user values when generating new question
        switch (type) {
            case TRANSFORMATION_TYPES.TRANSLATION:
                setTranslationValue(value as TranslationValue)
                setUserValues({translateX: 0, translateY: 0})
                break
            case TRANSFORMATION_TYPES.DILATATION:
                setDilatationValue(value as DilatationValue)
                setUserValues({scaleFactor: 1})
                break
            case TRANSFORMATION_TYPES.ROTATION:
                setRotationValue(value as RotationValue)
                setUserValues({angle: 0})
                break
            case TRANSFORMATION_TYPES.REFLECTION:
                setReflectionAxis(value as ReflectionValue)
                setUserValues({axis: 'origin', k: 0})
                break
        }

        const points = generateRandomShape().points
        setShapePoints(points)

        const {xRange, yRange} = calculateRange(points)
        const newPlotData = get2DShapePlotData(points)
        const newPlotLayout = get2DShapePlotLayout(xRange, yRange)
        setPlotData(newPlotData)
        setPlotLayout(newPlotLayout)

        setShouldAnimate(true)
    }

    const handleValueChange = (values: TranslationValue | DilatationValue | RotationValue | ReflectionValue) => {
        setUserValues(values);
    };

    const areValuesEqual = (a: any, b: any): boolean => {
        if (typeof a !== typeof b) return false;

        if (typeof a === 'object' && a !== null && b !== null) {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);

            if (keysA.length !== keysB.length) return false;

            for (const key of keysA) {
                if (!areValuesEqual(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }

        // For numbers, compare with tolerance for floating point precision
        if (typeof a === 'number' && typeof b === 'number') {
            return Math.abs(a - b) < 0.0001;
        }

        return a === b;
    };

    const getCorrectValues = (): TranslationValue | DilatationValue | RotationValue | ReflectionValue => {
        switch (transformationType) {
            case TRANSFORMATION_TYPES.TRANSLATION:
                return translationValue;
            case TRANSFORMATION_TYPES.DILATATION:
                return dilatationValue;
            case TRANSFORMATION_TYPES.ROTATION:
                return rotationValue;
            case TRANSFORMATION_TYPES.REFLECTION:
                return reflectionAxis;
            default:
                return translationValue
        }
    };

    const handleNextQuestion = async () => {
        if (!userValues) {
            toast.error('Harap isi nilai transformasi terlebih dahulu');
            return;
        }

        const correctValues = getCorrectValues();

        // Create the current answer
        const currentAnswer: DetermineValuePracticeAnswer = {
            transformationType: transformationType as 'translation' | 'dilatation' | 'rotation' | 'reflection',
            userValues: userValues,
            correctValues: correctValues
        };

        const isLastQuestion = currentQuestion >= questionAmount;

        if (isLastQuestion) {
            // For last question, include current answer in submission without updating state
            const finalAnswers = [...answers, currentAnswer];
            setIsSending(true);
            try {
                await handleRecordPractice(finalAnswers);
            } finally {
                setIsSending(false);
            }
            return;
        }

        // For non-last questions, update state and continue
        setAnswers(prev => [...prev, currentAnswer]);
        setCurrentQuestion(prev => prev + 1);
        handleGenerate();
    };

    const handleRecordPractice = async (answers: DetermineValuePracticeAnswer[]) => {
        const practicePayload: PracticePayload = {
            code: 'determine_value',
            score: {
                correct: answers.filter(answer => {
                    return areValuesEqual(answer.userValues, answer.correctValues);
                }).length,
                total: questionAmount,
            },
            content: {
                answers: answers
            }
        }

        try {
            const data = await practicesService.recordPractice(practicePayload)
            toast.success('Latihan menentukan nilai transformasi berhasil diselesaikan!');
            animatedNavigate({to: ROUTES.practices.practiceResult(data.practice._id)})
        } catch (error) {
            toast.error('Gagal menambahkan: ' + (error as Error).message);
        }
    }

    const handleRecordStatistic = async () => {
        if (auth?.user.role !== 'student') return

        // Record statistic for identify practice attempt
        await statisticsService.recordStatistic({
            type: "practice_attempt",
            data: {
                code: 'determine_value',
            }
        })
    }

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader
                title="Latihan Menentukan Nilai Transformasi"
                description="Latihan untuk menentukan nilai transformasi geometri yang tepat."
                colorScheme="blue"
            />

            <GeoCard
                content={
                    <div className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0">
                        <div className="flex-2">
                            {started &&
                                <PlotContainer
                                    shapePoints={shapePoints}
                                    plotData={plotData || []}
                                    plotLayout={plotLayout}
                                    perfStats={perfStats!!}
                                    initialRenderStartRef={initialRenderStartRef}
                                    animationRenderStartRef={animationRenderStartRef}
                                />
                            }

                            {!started && (
                                <div
                                    className="flex flex-col items-center justify-center space-y-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="text-center space-y-2">
                                        <h3 className="text-xl font-semibold text-slate-800">
                                            Siap Memulai Latihan?
                                        </h3>
                                        <p className="text-slate-600 max-w-md">
                                            Pilih jumlah soal yang ingin dikerjakan dan mulai latihan menentukan nilai transformasi geometri.
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
                                        <div className="flex flex-col items-center space-y-3">
                                            <span className="text-sm font-medium text-slate-700">
                                                Jumlah Soal
                                            </span>
                                            <div className="flex items-center space-x-3">
                                                <GeoButton
                                                    variant="outline"
                                                    onClick={() => {
                                                        if (questionAmount > 1) {
                                                            setQuestionAmount((prev) => prev - 1)
                                                        }
                                                    }}
                                                    disabled={questionAmount <= 1}
                                                    className="w-10 h-10 flex items-center justify-center"
                                                >
                                                    <Minus size={16}/>
                                                </GeoButton>

                                                <div className="w-16">
                                                    <GeoInput
                                                        id="question-amount-input"
                                                        value={questionAmount}
                                                        onChange={(e) => {
                                                            setQuestionAmount(Number(e.target.value))
                                                        }}
                                                        type="number"
                                                        min={1}
                                                        className="text-center"
                                                    />
                                                </div>

                                                <GeoButton
                                                    variant="outline"
                                                    onClick={() => {
                                                        setQuestionAmount((prev) => prev + 1)
                                                    }}
                                                    className="w-10 h-10 flex items-center justify-center"
                                                >
                                                    <Plus size={16}/>
                                                </GeoButton>
                                            </div>
                                        </div>

                                        <GeoButton
                                            variant="primary"
                                            onClick={() => {
                                                handleRecordStatistic()
                                                handleGenerate()
                                                setStarted(true)
                                            }}
                                            className="h-12 px-8"
                                        >
                                            <Play className="mr-2" size={18}/>
                                            Mulai Latihan
                                        </GeoButton>
                                    </div>
                                </div>
                            )}
                        </div>

                        {started && (
                            <div className="flex flex-col space-y-4 flex-1">
                                <GeoButton
                                    variant="secondary"
                                    onClick={() => startAnimation(transformationType as 'translation' | 'dilatation' | 'rotation' | 'reflection')}
                                    className="h-fit"
                                >
                                    <RotateCcw/> Ulangi Animasi
                                </GeoButton>

                                <DetermineValueInput
                                    question="Tentukan nilai transformasi geometri yang telah diterapkan."
                                    instruction="Isi nilai transformasi berdasarkan animasi yang ditampilkan."
                                    transformationType={transformationType as 'translation' | 'dilatation' | 'rotation' | 'reflection'}
                                    onValueChange={handleValueChange}
                                    currentValues={userValues || undefined}
                                    disabled={false}
                                    showResult={false}
                                />

                                <GeoButton
                                    variant="primary"
                                    onClick={() => {
                                        handleNextQuestion()
                                    }}
                                    className="h-fit"
                                    isLoading={isSending}
                                >
                                    <Check/>
                                    {currentQuestion < questionAmount ? 'Selanjutnya' : 'Selesaikan Latihan'}
                                </GeoButton>

                                {/* Soal Count Display */}
                                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-800 font-medium">
                                        Soal {currentQuestion} dari {questionAmount}
                                    </p>
                                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{width: `${(currentQuestion / questionAmount) * 100}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            />
        </div>
    );
}