// components/practice/answer-select.tsx
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle2, Circle} from "lucide-react";
import {cn} from "@/lib/utils";

interface AnswerSelectProps {
    question: string;
    instruction?: string;
    answers: string[];
    correctAnswer?: string; // Optional for practice mode
    onAnswerSelect: (selectedAnswer: string) => void;
    selectedAnswer?: string;
    disabled?: boolean;
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
    showResult?: boolean;
}

const colorMap = {
    purple: {
        border: "border-deep-purple-200",
        selected: "border-deep-purple-500 bg-deep-purple-50",
        hover: "hover:border-deep-purple-300",
        text: "text-deep-purple-700"
    },
    blue: {
        border: "border-blue-200",
        selected: "border-blue-500 bg-blue-50",
        hover: "hover:border-blue-300",
        text: "text-blue-700"
    },
    orange: {
        border: "border-orange-200",
        selected: "border-orange-500 bg-orange-50",
        hover: "hover:border-orange-300",
        text: "text-orange-700"
    },
    teal: {
        border: "border-teal-200",
        selected: "border-teal-500 bg-teal-50",
        hover: "hover:border-teal-300",
        text: "text-teal-700"
    },
    yellow: {
        border: "border-yellow-200",
        selected: "border-yellow-500 bg-yellow-50",
        hover: "hover:border-yellow-300",
        text: "text-yellow-700"
    },
    maroon: {
        border: "border-rose-200",
        selected: "border-rose-500 bg-rose-50",
        hover: "hover:border-rose-300",
        text: "text-rose-700"
    },
};

export default function AnswerSelect(
    {
        question,
        instruction = "Pilih jawaban yang benar:",
        answers,
        correctAnswer,
        onAnswerSelect,
        selectedAnswer,
        disabled = false,
        colorScheme = "blue",
        showResult = false
    }: AnswerSelectProps) {
    const colors = colorMap[colorScheme];

    const getAnswerState = (answer: string) => {
        if (!showResult || !correctAnswer) return "default";

        if (answer === correctAnswer) return "correct";
        if (answer === selectedAnswer && answer !== correctAnswer) return "incorrect";
        return "default";
    };

    const getAnswerClasses = (answer: string) => {
        const state = getAnswerState(answer);
        const baseClasses = cn(
            "w-full p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer",
            "flex items-center gap-3 text-left",
            colors.border,
            !disabled && colors.hover,
            !showResult && selectedAnswer === answer && colors.selected,
            disabled && "cursor-not-allowed opacity-60"
        );

        switch (state) {
            case "correct":
                return cn(baseClasses, "border-green-500 bg-green-50");
            case "incorrect":
                return cn(baseClasses, "border-red-500 bg-red-50");
            default:
                return baseClasses;
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {question}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {instruction}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {answers.map((answer, index) => {
                    const answerState = getAnswerState(answer);
                    const isSelected = selectedAnswer === answer;

                    return (
                        <div
                            key={index}
                            className={getAnswerClasses(answer)}
                            onClick={() => !disabled && onAnswerSelect(answer)}
                        >
                            <div className="flex-shrink-0">
                                {showResult ? (
                                    answerState === "correct" ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600"/>
                                    ) : answerState === "incorrect" ? (
                                        <Circle className="w-5 h-5 text-red-600"/>
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-400"/>
                                    )
                                ) : isSelected ? (
                                    <CheckCircle2 className="w-5 h-5 text-blue-600"/>
                                ) : (
                                    <Circle className="w-5 h-5 text-gray-400"/>
                                )}
                            </div>
                            <span className={cn(
                                "flex-1 font-medium",
                                showResult && answerState === "correct" && "text-green-700",
                                showResult && answerState === "incorrect" && "text-red-700",
                                !showResult && isSelected && colors.text
                            )}>
                                {answer}
                          </span>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}