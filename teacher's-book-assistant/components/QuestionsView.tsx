
import React from 'react';
import { type ChapterAnalysis } from '../types';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';

interface QuestionsViewProps {
  chapters: ChapterAnalysis[];
}

const QuestionsView: React.FC<QuestionsViewProps> = ({ chapters }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-700">Вопросы для обсуждения</h3>
      {chapters.map((chapter) => (
        <div key={chapter.chapter} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-700 mb-3">Глава {chapter.chapter}</h4>
          <ul className="space-y-2">
            {chapter.discussionQuestions.map((question, index) => (
              <li key={index} className="flex items-start gap-3">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                <span className="text-slate-700">{question}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionsView;
