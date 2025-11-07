import {useMemo} from 'react';
import type {ColumnDef} from '@tanstack/react-table';
import {type DetermineValuePracticeAnswer, type IdentifyPracticeAnswer} from '@/type.ts';
import {cn} from '@/lib/utils.ts';

export function usePracticeResultColumns() {
    return useMemo((): ColumnDef<any>[] => [
        {
            id: 'no',
            header: () => <div className="text-center font-bold">No</div>,
            cell: ({row}) => <div className="text-center font-medium">{row.index + 1}</div>,
            size: 10,
        },
        // {
        //     id: 'question',
        //     header: () => <div className="text-center font-bold">Soal</div>,
        //     cell: ({row}) => (
        //         <div className="text-center px-4 py-3 font-medium">
        //             Soal {row.index + 1}
        //         </div>
        //     ),
        //     size: 30,
        // },
        {
            id: 'userAnswer',
            header: () => <div className="text-center font-bold">Jawaban Anda</div>,
            cell: ({row}) => {
                const answer = row.original;

                if (isIdentifyPracticeAnswer(answer)) {
                    return (
                        <div className={cn(
                            "text-center px-4 py-2 font-semibold rounded-lg mx-2",
                            answer.userAnswer === answer.correctAnswer
                                ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                        )}>
                            {translateTransformationType(answer.userAnswer)}
                        </div>
                    );
                } else if (isDetermineValuePracticeAnswer(answer)) {
                    return (
                        <div className="text-center px-4 py-3 font-medium">
                            {renderTransformationValue(answer.userValues, answer.transformationType)}
                        </div>
                    );
                }

                return <div className="text-center">-</div>;
            },
            size: 30,
        },
        {
            id: 'correctAnswer',
            header: () => <div className="text-center font-bold">Jawaban Benar</div>,
            cell: ({row}) => {
                const answer = row.original;

                if (isIdentifyPracticeAnswer(answer)) {
                    return (
                        <div
                            className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-center px-4 py-2 font-semibold rounded-lg mx-2">
                            {translateTransformationType(answer.correctAnswer)}
                        </div>
                    );
                } else if (isDetermineValuePracticeAnswer(answer)) {
                    return (
                        <div className="text-center px-4 py-3 font-medium">
                            {renderTransformationValue(answer.correctValues, answer.transformationType)}
                        </div>
                    );
                }

                return <div className="text-center">-</div>;
            },
            size: 30,
        },
        {
            id: 'status',
            header: () => <div className="text-center font-bold">Status</div>,
            cell: ({row}) => {
                const answer = row.original;
                let isCorrect = false;

                if (isIdentifyPracticeAnswer(answer)) {
                    isCorrect = answer.userAnswer === answer.correctAnswer;
                } else if (isDetermineValuePracticeAnswer(answer)) {
                    // For determine value practice, we need to compare the values
                    isCorrect = compareTransformationValues(
                        answer.userValues,
                        answer.correctValues,
                        answer.transformationType
                    );
                }

                return (
                    <div className={cn(
                        "text-center px-4 py-2 font-bold rounded-lg mx-2",
                        isCorrect
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                            : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                    )}>
                        {isCorrect ? "Benar" : "Salah"}
                    </div>
                );
            },
            size: 20,
        },
    ], []);
}

// Helper functions
function isIdentifyPracticeAnswer(answer: any): answer is IdentifyPracticeAnswer {
    return answer.correctAnswer && typeof answer.correctAnswer === 'string' &&
        ['translation', 'dilatation', 'rotation', 'reflection'].includes(answer.correctAnswer);
}

function isDetermineValuePracticeAnswer(answer: any): answer is DetermineValuePracticeAnswer {
    return answer.transformationType && answer.userValues && answer.correctValues;
}

function translateTransformationType(type: string): string {
    const translations: Record<string, string> = {
        'translation': 'Translasi',
        'dilatation': 'Dilatasi',
        'rotation': 'Rotasi',
        'reflection': 'Refleksi'
    };
    return translations[type] || type;
}

function renderTransformationValue(values: any, type: string): string {
    switch (type) {
        case 'translation':
            return `X: ${values.translateX}, Y: ${values.translateY}${values.translateZ ? `, Z: ${values.translateZ}` : ''}`;
        case 'dilatation':
            return `Faktor Skala: ${values.scaleFactor}`;
        case 'rotation':
            return `Sudut: ${values.angle}°${values.axis ? `, Sumbu: ${values.axis}` : ''}`;
        case 'reflection':
            return `Sumbu: ${translateReflectionAxis(values.axis)}${values.k !== undefined ? `, k: ${values.k}` : ''}`;
        default:
            return JSON.stringify(values);
    }
}

function translateReflectionAxis(axis: string): string {
    const translations: Record<string, string> = {
        'origin': 'Titik Asal',
        'x-axis': 'Sumbu X',
        'y-axis': 'Sumbu Y',
        'line-y-x': 'Garis y = x',
        'line-y-neg-x': 'Garis y = -x',
        'line-y-k': 'Garis y = k',
        'line-x-k': 'Garis x = k',
        'radio-xy-plane': 'Bidang XY',
        'radio-yz-plane': 'Bidang YZ',
        'radio-xz-plane': 'Bidang XZ'
    };
    return translations[axis] || axis;
}

function compareTransformationValues(user: any, correct: any, type: string): boolean {
    switch (type) {
        case 'translation':
            return user.translateX === correct.translateX &&
                user.translateY === correct.translateY &&
                user.translateZ === correct.translateZ;
        case 'dilatation':
            return user.scaleFactor === correct.scaleFactor;
        case 'rotation':
            return user.angle === correct.angle && user.axis === correct.axis;
        case 'reflection':
            return user.axis === correct.axis && user.k === correct.k;
        default:
            return JSON.stringify(user) === JSON.stringify(correct);
    }
}