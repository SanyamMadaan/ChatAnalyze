import React from 'react';
import { ContentRelation } from '../types';
import { Network } from 'lucide-react';

interface RelationshipGraphProps {
  relations: ContentRelation[];
}

export function RelationshipGraph({ relations }: RelationshipGraphProps) {
  const significantRelations = relations.filter(r => r.strength > 0.3);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Network className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Content Relationships</h3>
      </div>
      
      <div className="space-y-4">
        {significantRelations.map((relation, index) => (
          <div key={index} className="border-l-2 border-blue-200 pl-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Relationship Strength: {Math.round(relation.strength * 100)}%
              </p>
            </div>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700">{relation.source.content}</p>
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-200" />
                <span className="px-2 text-sm text-gray-500">relates to</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>
              <p className="text-gray-700">{relation.target.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}