
import React, { useState, useCallback } from 'react';
import UrlInputForm from './components/UrlInputForm';
import AnalysisResults from './components/AnalysisResults';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { analyzeWebsite } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [analyzedUrl, setAnalyzedUrl] = useState<string>('');

  const handleAnalysisSubmit = useCallback(async (url: string) => {
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);
    setAnalyzedUrl(url);

    try {
      const result = await analyzeWebsite(url);
      setAnalysisResult(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-slate-100 py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            AI Website Analyzer
          </span>
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          Get AI-powered insights to enhance your website's user experience, design, SEO, and product appeal.
        </p>
      </header>

      <main>
        <UrlInputForm onSubmit={handleAnalysisSubmit} isLoading={isLoading} />
        {isLoading && <LoadingSpinner />}
        <ErrorMessage message={error} />
        {analysisResult && !isLoading && !error && (
          <AnalysisResults results={analysisResult} analyzedUrl={analyzedUrl} />
        )}
      </main>

      <footer className="text-center mt-16 py-6 border-t border-slate-700">
        <p className="text-sm text-slate-400">
          Powered by Gemini API. For educational and illustrative purposes.
        </p>
         <p className="text-xs text-slate-500 mt-1">
          Always verify AI-generated suggestions with professional expertise.
        </p>
      </footer>
    </div>
  );
};

export default App;
