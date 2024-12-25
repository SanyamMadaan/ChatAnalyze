import { ChatMessage, Pattern, ParsedData } from '../types';

export function analyzePatterns(messages: ChatMessage[]): ParsedData {
  const patterns: Pattern[] = [];
  const messagesByType = new Map<string, ChatMessage[]>();

  // Group messages by type
  messages.forEach(msg => {
    const existing = messagesByType.get(msg.type) || [];
    messagesByType.set(msg.type, [...existing, msg]);
  });

  // Create patterns for each type
  messagesByType.forEach((msgs, type) => {
    patterns.push({
      type,
      items: msgs,
      frequency: msgs.length
    });
  });

  // Sort patterns by frequency
  patterns.sort((a, b) => b.frequency - a.frequency);

  return {
    patterns,
    messageCount: messages.length,
    timeRange: {
      start: new Date(Math.min(...messages.map(m => m.timestamp.getTime()))),
      end: new Date(Math.max(...messages.map(m => m.timestamp.getTime())))
    }
  };
}