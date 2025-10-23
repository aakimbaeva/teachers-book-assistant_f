
import React from 'react';
import { type ChapterAnalysis } from '../types';

interface KeywordsViewProps {
  chapters: ChapterAnalysis[];
}

const KeywordsView: React.FC<KeywordsViewProps> = ({ chapters }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-700">Ключевые слова по главам</h3>
      {chapters.map((chapter) => (
        <div key={chapter.chapter} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-700 mb-3">Глава {chapter.chapter}</h4>
          <div className="flex flex-wrap gap-2">
            {chapter.keywords.map((keyword) => (
              <span key={keyword} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeywordsView;
