'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
}

// Mock questions - in production, these would come from an API
const questions: Question[] = [
  {
    id: 1,
    text: 'In the Yoruba culture, which of these birds is known to pick up young chicks?',
    options: [
      { label: 'A', value: 'Asa' },
      { label: 'B', value: 'Adaba' },
      { label: 'C', value: 'Okin' },
      { label: 'D', value: 'Ewure' },
    ],
    correctAnswer: 'Asa',
  },
  {
    id: 2,
    text: 'What is the Yoruba word for "good morning"?',
    options: [
      { label: 'A', value: 'E kaale' },
      { label: 'B', value: 'E kaaro' },
      { label: 'C', value: 'E kasan' },
      { label: 'D', value: 'O dabo' },
    ],
    correctAnswer: 'E kaaro',
  },
  {
    id: 3,
    text: 'Which deity is known as the god of iron in Yoruba mythology?',
    options: [
      { label: 'A', value: 'Sango' },
      { label: 'B', value: 'Ogun' },
      { label: 'C', value: 'Osun' },
      { label: 'D', value: 'Obatala' },
    ],
    correctAnswer: 'Ogun',
  },
  {
    id: 4,
    text: 'What does "Omo" mean in Yoruba?',
    options: [
      { label: 'A', value: 'Father' },
      { label: 'B', value: 'Mother' },
      { label: 'C', value: 'Child' },
      { label: 'D', value: 'Elder' },
    ],
    correctAnswer: 'Child',
  },
  {
    id: 5,
    text: 'Which Yoruba festival celebrates the new yam harvest?',
    options: [
      { label: 'A', value: 'Egungun' },
      { label: 'B', value: 'Odun Ijesu' },
      { label: 'C', value: 'Odun Isu' },
      { label: 'D', value: 'Gelede' },
    ],
    correctAnswer: 'Odun Isu',
  },
];

export default function CuratorTestPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1] || null);
    } else {
      router.back();
    }
  };

  const handleSelectAnswer = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate score and navigate to result
      const correctCount = newAnswers.filter(
        (answer, index) => answer === questions[index].correctAnswer
      ).length;
      const passed = correctCount >= 3; // Pass if 3 or more correct
      router.push(
        `/curator-test/result?passed=${passed}&score=${correctCount}`
      );
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1] || null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 lg:px-8 lg:py-6">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-8 lg:px-8 lg:pb-16">
        <div className="max-w-md lg:max-w-lg mx-auto">
          {/* Question Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-[20px] border border-neutral-200 dark:border-neutral-800 p-6 lg:p-8">
            {/* Card Header */}
            <div className="text-center pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
              <h1 className="heading-3 text-neutral-950 dark:text-neutral-50 mb-2">
                Lang Cultural Check
              </h1>
              <p className="body-small text-neutral-600 dark:text-neutral-400">
                Provide your answers to these questions, to become a Neo
                Contributor
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="body-base font-semibold text-neutral-600 dark:text-neutral-400">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalQuestions }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-8 rounded-full transition-colors ${
                      index <= currentQuestionIndex
                        ? 'bg-neutral-950 dark:bg-neutral-50'
                        : 'bg-neutral-200 dark:bg-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <h2 className="heading-5 text-neutral-950 dark:text-neutral-50 mb-6 leading-relaxed">
              {currentQuestion.text}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map(option => (
                <button
                  key={option.label}
                  onClick={() => handleSelectAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedAnswer === option.value
                      ? 'border-primary bg-neutral-50 dark:bg-neutral-800 ring-1 ring-primary'
                      : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span className="body-base font-medium text-neutral-800 dark:text-neutral-200">
                    {option.label}. {option.value}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Button */}
      <div className="px-5 pb-8 lg:px-8 lg:pb-12">
        <div className="max-w-md lg:max-w-lg mx-auto">
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`w-full rounded-full h-14 lg:h-16 text-lg lg:text-xl font-semibold transition-colors ${
              selectedAnswer
                ? 'bg-neutral-950 dark:bg-neutral-50 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950'
                : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-500 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Submit Test' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
}
