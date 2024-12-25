import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { PatternDisplay } from './components/PatternDisplay';
import { parseWhatsAppChat } from './utils/parser';
import { analyzePatterns } from './utils/patterns';
import { ParsedData } from './types';
import { Brain } from 'lucide-react';

function App() {
  const [data, setData] = useState<ParsedData | null>(null);

  const handleFileSelect = (content: string) => {
    const messages = parseWhatsAppChat(content);
    const patterns = analyzePatterns(messages);
    setData(patterns);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              MuseYard Pattern Explorer
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!data ? (
          <div className="max-w-xl mx-auto">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div>
            <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-2">Analysis Summary</h2>
              <p className="text-gray-600">
                Analyzed {data.messageCount} messages from{' '}
                {data.timeRange.start.toLocaleDateString()} to{' '}
                {data.timeRange.end.toLocaleDateString()}
              </p>
            </div>
            
            <div className="grid gap-6">
              {data.patterns.map((pattern, index) => (
                <PatternDisplay key={index} pattern={pattern} />
              ))}
            </div>

            <button
              onClick={() => setData(null)}
              className="mt-8 px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            >
              Analyze Another Chat
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;