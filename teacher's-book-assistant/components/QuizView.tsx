
import React, { useState } from 'react';
import { type QuizItem } from '../types';

interface QuizViewProps {
  items: QuizItem[];
}

const QuizItemComponent: React.FC<{ item: QuizItem, index: number }> = ({ item, index }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    return (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-slate-700 mb-3">
                <span className="font-semibold mr-2">{index + 1}.</span> 
                {item.question.split('_____').map((part, i) => 
                    <React.Fragment key={i}>
                        {part}
                        {i < item.question.split('_____').length - 1 && <span className="font-bold text-blue-600">_____</span>}
                    </React.Fragment>
                )}
            </p>
            <button onClick={() => setShowAnswer(!showAnswer)} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                {showAnswer ? 'Скрыть ответ' : 'Показать ответ'}
            </button>
            {showAnswer && (
                <div className="mt-2 p-2 bg-green-100 text-green-800 border border-green-200 rounded">
                    <strong>Ответ:</strong> {item.answer}
                </div>
            )}
        </div>
    )
}

const QuizView: React.FC<QuizViewProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-700">Викторина "Заполни пропуск"</h3>
      <p className="text-slate-500">Проверьте знание текста, заполнив пропуски в предложениях.</p>
      <div className="space-y-4 pt-4">
        {items.map((item, index) => (
            <QuizItemComponent key={index} item={item} index={index}/>
        ))}
      </div>
    </div>
  );
};

export default QuizView;
