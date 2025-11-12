// components/practice/answer-select.tsx
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle2, Circle} from "lucide-react";
import {cn} from "@/lib/utils";
import { colorMap, DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface AnswerSelectProps {
    question: string;
    instruction?: string;
    answers: string[];
    correctAnswer?: string; // Optional for practice mode
    onAnswerSelect: (selectedAnswer: string) => void;
    selectedAnswer?: string;
    disabled?: boolean;
    colorScheme?: ColorScheme;
    showResult?: boolean;
}


export default function AnswerSelect(
    {
        question,
        instruction = "Pilih jawaban yang benar:",
        answers,
        correctAnswer,
        onAnswerSelect,
        selectedAnswer,
        disabled = false,
        colorScheme = DEFAULT_COLOR_SCHEME,
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