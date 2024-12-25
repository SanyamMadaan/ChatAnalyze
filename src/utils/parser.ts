import { ChatMessage } from '../types';

export function parseWhatsAppChat(text: string): ChatMessage[] {
  const messages: ChatMessage[] = [];
  const lines = text.split('\n');

  for (const line of lines) {
    const match = line.match(/\[(.*?)\].*?:\s*(.*)/);
    if (!match) continue;

    const [, timestamp, content] = match;
    const date = new Date(timestamp);
    
    let type: ChatMessage['type'] = 'note';

    if (content.includes('http')) {
      type = 'link';
    } else if (content.includes('"') && content.includes('-')) {
      type = 'quote';
    } else if (content.toLowerCase().includes('reading list') || content.includes('must read')) {
      type = 'reading_list';
    } else if (
      content.toLowerCase().includes('reflection') || 
      content.toLowerCase().includes('note to self') ||
      content.toLowerCase().includes('brain dump')
    ) {
      type = 'reflection';
    }

    messages.push({
      timestamp: date,
      content: content.trim(),
      type
    });
  }

  return messages;
}