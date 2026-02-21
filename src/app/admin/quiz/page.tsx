'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  ArrowLeft,
  Upload,
  Plus,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Papa from 'papaparse';
import {
  addQuizQuestion,
  bulkAddQuizQuestions,
  QuizOption,
} from '@/actions/quiz';

interface LanguageOption {
  id: number;
  name: string;
}

// Temporary hardcoded language list, ideally fetched from an API
const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { id: 1, name: 'English' }, // Replace with actual IDs from your DB if different
  { id: 2, name: 'Hausa' },
  { id: 3, name: 'Yoruba' },
  { id: 4, name: 'Igbo' },
];

export default function AdminQuizPage() {
  const router = useRouter();
  const { appUser, isLoading: authLoading } = useAuth();
  const { can } = usePermissions();

  const [activeTab, setActiveTab] = useState<'manual' | 'csv'>('manual');
  const [selectedLanguageId, setSelectedLanguageId] = useState<number>(
    AVAILABLE_LANGUAGES[0].id
  );

  // Manual Form State
  const [manualQuestion, setManualQuestion] = useState('');
  const [manualOptions, setManualOptions] = useState<QuizOption[]>([
    { label: 'A', value: '' },
    { label: 'B', value: '' },
    { label: 'C', value: '' },
    { label: 'D', value: '' },
  ]);
  const [manualCorrectAnswer, setManualCorrectAnswer] = useState<string>('A');
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);
  const [manualSuccess, setManualSuccess] = useState<string | null>(null);
  const [manualError, setManualError] = useState<string | null>(null);

  // CSV State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isUploadingCsv, setIsUploadingCsv] = useState(false);
  const [csvSuccess, setCsvSuccess] = useState<string | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!appUser || !can('view:admin')) {
      router.push('/home');
    }
  }, [appUser, authLoading, can, router]);

  if (authLoading || !appUser) return null;

  // --- Manual Submission ---
  const handleManualOptionChange = (index: number, value: string) => {
    const newOptions = [...manualOptions];
    newOptions[index].value = value;
    setManualOptions(newOptions);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingManual(true);
    setManualSuccess(null);
    setManualError(null);

    // Find the correct answer text to store
    const correctOption = manualOptions.find(
      o => o.label === manualCorrectAnswer
    );
    if (!correctOption || !correctOption.value.trim()) {
      setManualError('The selected correct answer option cannot be empty.');
      setIsSubmittingManual(false);
      return;
    }

    try {
      const result = await addQuizQuestion({
        languageId: selectedLanguageId,
        text: manualQuestion,
        options: manualOptions,
        correctAnswer: correctOption.value.trim(),
      });

      if (result.success) {
        setManualSuccess('Question added successfully!');
        setManualQuestion('');
        setManualOptions([
          { label: 'A', value: '' },
          { label: 'B', value: '' },
          { label: 'C', value: '' },
          { label: 'D', value: '' },
        ]);
        setManualCorrectAnswer('A');
      } else {
        setManualError(result.error || 'Failed to add question');
      }
    } catch (err) {
      setManualError('An unexpected error occurred.');
    } finally {
      setIsSubmittingManual(false);
    }
  };

  // --- CSV Submission ---
  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
      setCsvSuccess(null);
      setCsvError(null);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile) return;
    setIsUploadingCsv(true);
    setCsvSuccess(null);
    setCsvError(null);

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async results => {
        try {
          const formattedQuestions = [];
          for (const row of results.data as any[]) {
            // Expected headers conceptually: Question, Option A, Option B, Option C, Option D, Answer
            // We use keys derived from user input or just index mapping if standardizing

            // Map keys case-insensitively
            const getVal = (key: string) => {
              const actualKey = Object.keys(row).find(
                k => k.trim().toLowerCase() === key.toLowerCase()
              );
              return actualKey ? row[actualKey] : '';
            };

            const text =
              getVal('question') || getVal('text') || getVal('hausa'); // Attempting to handle the user's specific HAUSA column too just in case
            const optA = getVal('option a');
            const optB = getVal('option b');
            const optC = getVal('option c');
            const optD = getVal('option d');
            const ansLetterGroup = getVal('answer'); // "A", "B", "C", "D"

            if (!text || !optA || !optB || !optC || !optD || !ansLetterGroup) {
              // Skip invalid rows, maybe log them
              continue;
            }

            const options = [
              { label: 'A', value: optA },
              { label: 'B', value: optB },
              { label: 'C', value: optC },
              { label: 'D', value: optD },
            ];

            const ansLetter = ansLetterGroup.trim().toUpperCase() || 'A';
            const correctOption = options.find(o => o.label === ansLetter);
            const correctAnswer = correctOption ? correctOption.value : optA; // Fallback

            formattedQuestions.push({
              languageId: selectedLanguageId,
              text: text,
              options: options,
              correctAnswer: correctAnswer,
            });
          }

          if (formattedQuestions.length === 0) {
            setCsvError(
              'No valid questions found in the CSV. Please check the format.'
            );
            setIsUploadingCsv(false);
            return;
          }

          const result = await bulkAddQuizQuestions(formattedQuestions);
          if (result.success) {
            setCsvSuccess(`Successfully added ${result.count} questions!`);
            setCsvFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          } else {
            setCsvError(result.error || 'Failed to upload questions');
          }
        } catch (err) {
          setCsvError('Error parsing or submitting CSV file.');
        } finally {
          setIsUploadingCsv(false);
        }
      },
      error: error => {
        setCsvError('Error parsing CSV file: ' + error.message);
        setIsUploadingCsv(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">
      <header className="h-16 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 flex items-center px-4 md:px-6 sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="heading-6 text-neutral-950 dark:text-neutral-50">
          Quiz Settings
        </h1>
      </header>

      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="heading-4 text-neutral-900 dark:text-neutral-100 mb-2">
            Curator Test Questions
          </h2>
          <p className="body-base text-neutral-500 dark:text-neutral-400">
            Manage the questions used for the Curator evaluation test. Select
            the language and choose to add questions manually or via CSV upload.
          </p>
        </div>

        {/* Global Settings */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800 mb-8">
          <label className="block heading-6 text-neutral-900 dark:text-neutral-100 mb-3">
            Target Language
          </label>
          <select
            value={selectedLanguageId}
            onChange={e => setSelectedLanguageId(Number(e.target.value))}
            className="w-full md:w-1/2 p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {AVAILABLE_LANGUAGES.map(lang => (
              <option
                key={lang.id}
                value={lang.id}
                className="dark:bg-neutral-900"
              >
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-6">
          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'manual' ? 'text-primary' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            Add Manually
            {activeTab === 'manual' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'csv' ? 'text-primary' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            CSV Upload
            {activeTab === 'csv' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        </div>

        {/* Manual Form */}
        {activeTab === 'manual' && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
            <form onSubmit={handleManualSubmit} className="space-y-6">
              {manualSuccess && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p>{manualSuccess}</p>
                </div>
              )}
              {manualError && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{manualError}</p>
                </div>
              )}

              <div>
                <label className="block body-small font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Question Text
                </label>
                <Input
                  required
                  placeholder="e.g., What is the Yoruba word for water?"
                  type="text"
                  value={manualQuestion}
                  onChange={e => setManualQuestion(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {manualOptions.map((opt, idx) => (
                  <div key={opt.label}>
                    <label className="block body-small font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                      Option {opt.label}
                    </label>
                    <Input
                      required
                      placeholder={`Detail for option ${opt.label}`}
                      type="text"
                      value={opt.value}
                      onChange={e =>
                        handleManualOptionChange(idx, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block body-small font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Correct Answer
                </label>
                <select
                  value={manualCorrectAnswer}
                  onChange={e => setManualCorrectAnswer(e.target.value)}
                  className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="A" className="dark:bg-neutral-900">
                    Option A
                  </option>
                  <option value="B" className="dark:bg-neutral-900">
                    Option B
                  </option>
                  <option value="C" className="dark:bg-neutral-900">
                    Option C
                  </option>
                  <option value="D" className="dark:bg-neutral-900">
                    Option D
                  </option>
                </select>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <Button
                  type="submit"
                  disabled={isSubmittingManual}
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isSubmittingManual ? 'Saving...' : 'Save Question'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* CSV Upload */}
        {activeTab === 'csv' && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl body-small">
                <p className="font-semibold mb-2">CSV Format Requirements:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your file must have a header row.</li>
                  <li>
                    Required columns:{' '}
                    <strong>
                      Question, Option A, Option B, Option C, Option D, Answer
                    </strong>
                  </li>
                  <li>
                    The <strong>Answer</strong> column should contain the letter
                    of the correct option (e.g., A, B, C, or D).
                  </li>
                  <li>
                    Questions will be assigned to the target language selected
                    above.
                  </li>
                </ul>
              </div>

              {csvSuccess && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p>{csvSuccess}</p>
                </div>
              )}
              {csvError && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{csvError}</p>
                </div>
              )}

              <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <Upload className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
                <h3 className="heading-6 text-neutral-900 dark:text-neutral-100 mb-2">
                  Upload CSV File
                </h3>
                <p className="text-sm text-neutral-500 mb-6">
                  Drag and drop your file here, or click to browse
                </p>

                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvChange}
                  className="hidden"
                  id="csv-upload"
                  ref={fileInputRef}
                />
                <Button asChild variant="outline">
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    Browse Files
                  </label>
                </Button>

                {csvFile && (
                  <p className="mt-4 text-sm font-medium text-primary">
                    Selected: {csvFile.name}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                <Button
                  onClick={handleCsvUpload}
                  disabled={!csvFile || isUploadingCsv}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {isUploadingCsv ? 'Uploading...' : 'Upload Questions'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
