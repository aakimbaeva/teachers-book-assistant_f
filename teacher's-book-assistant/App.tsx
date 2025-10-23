
import React, { useState, useCallback } from 'react';
import { type AnalysisData } from './types';
import { generateEducationalMaterials } from './services/geminiService';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Loader from './components/Loader';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [bookText, setBookText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setBookText(text);
      setAnalysisResult(null); // Reset previous results
      setError(null);
    };
    reader.onerror = () => {
      setError('Не удалось прочитать файл. Пожалуйста, попробуйте еще раз.');
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleGenerate = useCallback(async () => {
    if (!bookText) {
      setError('Пожалуйста, сначала загрузите текстовый файл книги.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await generateEducationalMaterials(bookText);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError('Произошла ошибка при генерации материалов. Возможно, текст слишком большой или возникла проблема с API. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  }, [bookText]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Начнем работу</h2>
          <p className="text-slate-500 mb-6">Загрузите текстовый файл (.txt) с произведением, чтобы сгенерировать учебные материалы.</p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <FileUpload onFileSelect={handleFileSelect} />
            <button
              onClick={handleGenerate}
              disabled={!bookText || isLoading}
              className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Генерация...
                </>
              ) : (
                'Создать материалы'
              )}
            </button>
          </div>
          
          {error && <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">{error}</div>}
        </div>

        {isLoading && <Loader />}

        {analysisResult && !isLoading && (
          <div className="mt-8">
            <ResultsDisplay data={analysisResult} />
          </div>
        )}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Проект финального курса по Data Science</p>
      </footer>
    </div>
  );
};

export default App;
