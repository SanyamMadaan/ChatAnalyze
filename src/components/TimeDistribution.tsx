import React from 'react';
import { TimeAnalysis } from '../types';
import { Clock } from 'lucide-react';

interface TimeDistributionProps {
  analysis: TimeAnalysis;
}

export function TimeDistribution({ analysis }: TimeDistributionProps) {
  const maxValue = Math.max(...analysis.hourDistribution);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Clock className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Time Distribution</h3>
      </div>
      
      <div className="grid grid-cols-24 gap-1 h-32">
        {analysis.hourDistribution.map((count, hour) => (
          <div key={hour} className="flex flex-col items-center">
            <div 
              className="w-full bg-blue-200 rounded-t"
              style={{ 
                height: `${(count / maxValue) * 100}%`,
                backgroundColor: hour === analysis.mostActiveHour ? '#3B82F6' : '#BFDBFE'
              }}
            />
            <span className="text-xs text-gray-500 mt-1">
              {hour.toString().padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-600 mt-4">
        Most active hour: {analysis.mostActiveHour.toString().padStart(2, '0')}:00
      </p>
    </div>
  );
}