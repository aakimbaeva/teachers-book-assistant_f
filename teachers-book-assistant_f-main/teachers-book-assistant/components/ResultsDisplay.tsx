
import React, { useState } from 'react';
import { type AnalysisData } from '../types';
import SummaryView from './SummaryView';
import KeywordsView from './KeywordsView';
import QuestionsView from './QuestionsView';
import QuizView from './QuizView';
import EntitiesView from './EntitiesView';
import TabButton from './TabButton';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { KeyIcon } from './icons/KeyIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { PuzzlePieceIcon } from './icons/PuzzlePieceIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';

interface ResultsDisplayProps {
  data: AnalysisData;
}

type Tab = 'summary' | 'keywords' | 'questions' | 'quiz' | 'entities';

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <SummaryView chapters={data.chapters} />;
      case 'keywords':
        return <KeywordsView chapters={data.chapters} />;
      case 'questions':
        return <QuestionsView chapters={data.chapters} />;
      case 'quiz':
        return <QuizView items={data.quiz} />;
      case 'entities':
        return <EntitiesView items={data.entities} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800">Готовые материалы</h2>
            <p className="text-slate-500 mt-1">Анализ по книге: <span className="font-semibold text-slate-600">"{data.title}"</span></p>
        </div>
        <div className="p-2 bg-slate-50 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
                <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')}>
                    <BookOpenIcon className="w-5 h-5"/> Пересказы
                </TabButton>
                <TabButton isActive={activeTab === 'keywords'} onClick={() => setActiveTab('keywords')}>
                    <KeyIcon className="w-5 h-5"/> Ключевые слова
                </TabButton>
                <TabButton isActive={activeTab === 'questions'} onClick={() => setActiveTab('questions')}>
                    <QuestionMarkCircleIcon className="w-5 h-5"/> Вопросы
                </TabButton>
                <TabButton isActive={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')}>
                    <PuzzlePieceIcon className="w-5 h-5"/> Викторина
                </TabButton>
                <TabButton isActive={activeTab === 'entities'} onClick={() => setActiveTab('entities')}>
                    <UserGroupIcon className="w-5 h-5"/> Герои и места
                </TabButton>
            </div>
        </div>
        <div className="p-6 md:p-8">
            {renderContent()}
        </div>
    </div>
  );
};

export default ResultsDisplay;
