import { ChatMessage } from '../../types';

export function parseMessage(line: string): ChatMessage | null {
  const match = line.match(/\[(.*?)\].*?:\s*(.*)/);
  if (!match) return null;

  const [, timestamp, content] = match;
  return {
    timestamp: new Date(timestamp),
    content: content.trim(),
    type: determineMessageType(content)
  };
}

function determineMessageType(content: string): ChatMessage['type'] {
  const lowerContent = content.toLowerCase();
  
  if (content.includes('http')) {
    return 'link';
  }
  if (content.includes('"') && content.includes('-')) {
    return 'quote';
  }
  if (lowerContent.includes('reading list') || lowerContent.includes('must read')) {
    return 'reading_list';
  }
  if (
    lowerContent.includes('reflection') || 
    lowerContent.includes('note to self') ||
    lowerContent.includes('brain dump')
  ) {
    return 'reflection';
  }
  
  return 'note';
}