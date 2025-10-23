
import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-lg text-white">
          <BookOpenIcon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Teacher's Book Assistant</h1>
          <p className="text-slate-500">Автоматическая генерация учебных материалов</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
