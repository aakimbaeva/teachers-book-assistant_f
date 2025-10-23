
import React, { useState, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { XIcon } from './icons/XIcon';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setFileName(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
     // Note: We can't easily reset the parent's bookText state from here,
     // that should be handled by the parent component logic (e.g., when a new file is uploaded).
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt"
      />
      {!fileName ? (
        <button
          onClick={handleButtonClick}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
        >
          <UploadIcon className="w-6 h-6" />
          <span className="font-semibold">Выберите .txt файл</span>
        </button>
      ) : (
        <div className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-3 overflow-hidden">
            <FileTextIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <span className="font-medium text-slate-700 truncate">{fileName}</span>
          </div>
          <button onClick={handleReset} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-700">
             <XIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
