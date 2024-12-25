export interface ChatMessage {
  timestamp: Date;
  content: string;
  type: 'link' | 'quote' | 'note' | 'reading_list' | 'reflection';
}

export interface Pattern {
  type: string;
  items: ChatMessage[];
  frequency: number;
}

export interface ContentRelation {
  source: ChatMessage;
  target: ChatMessage;
  strength: number;
}

export interface TimeAnalysis {
  hourDistribution: number[];
  mostActiveHour: number;
}

export interface ParsedData {
  patterns: Pattern[];
  messageCount: number;
  timeRange: {
    start: Date;
    end: Date;
  };
  relations: ContentRelation[];
  timeAnalysis: TimeAnalysis;
}