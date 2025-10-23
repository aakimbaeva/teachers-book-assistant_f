
import React from 'react';
import { type ChapterAnalysis } from '../types';

interface SummaryViewProps {
  chapters: ChapterAnalysis[];
}

const SummaryView: React.FC<SummaryViewProps> = ({ chapters }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-700">Краткий пересказ по главам</h3>
      {chapters.map((chapter) => (
        <div key={chapter.chapter} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-700 mb-2">Глава {chapter.chapter}</h4>
          <p className="text-slate-600 leading-relaxed">{chapter.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryView;
