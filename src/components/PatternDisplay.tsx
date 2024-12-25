import React from 'react';
import { Pattern } from '../types';
import { MessageCircle, Link, Quote, Book, Brain } from 'lucide-react';

const TYPE_ICONS = {
  link: Link,
  quote: Quote,
  reading_list: Book,
  reflection: Brain,
  note: MessageCircle,
};

interface PatternDisplayProps {
  pattern: Pattern;
}

export function PatternDisplay({ pattern }: PatternDisplayProps) {
  const Icon = TYPE_ICONS[pattern.type as keyof typeof TYPE_ICONS];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold capitalize">
          {pattern.type.replace('_', ' ')}
          <span className="ml-2 text-sm text-gray-500">
            ({pattern.frequency} items)
          </span>
        </h3>
      </div>
      
      <div className="space-y-4">
        {pattern.items.map((item, index) => (
          <div key={index} className="border-l-2 border-blue-200 pl-4">
            <p className="text-sm text-gray-500 mb-1">
              {item.timestamp.toLocaleString()}
            </p>
            <p className="text-gray-700">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}