import { ChatMessage, Pattern, ParsedData, ContentRelation } from '../../types';

export function analyzePatterns(messages: ChatMessage[]): ParsedData {
  const patterns = createPatterns(messages);
  const relations = findContentRelations(messages);
  const timeAnalysis = analyzeTimeDistribution(messages);

  return {
    patterns: sortPatternsByFrequency(patterns),
    messageCount: messages.length,
    timeRange: getTimeRange(messages),
    relations,
    timeAnalysis
  };
}

function createPatterns(messages: ChatMessage[]): Pattern[] {
  const messagesByType = new Map<string, ChatMessage[]>();
  
  messages.forEach(msg => {
    const existing = messagesByType.get(msg.type) || [];
    messagesByType.set(msg.type, [...existing, msg]);
  });

  return Array.from(messagesByType.entries()).map(([type, msgs]) => ({
    type,
    items: msgs,
    frequency: msgs.length
  }));
}

function findContentRelations(messages: ChatMessage[]): ContentRelation[] {
  const relations: ContentRelation[] = [];
  const topics = extractTopics(messages);

  // Find messages with similar topics
  topics.forEach((topic, messageIndex) => {
    topics.forEach((otherTopic, otherIndex) => {
      if (messageIndex !== otherIndex && areTopicsRelated(topic, otherTopic)) {
        relations.push({
          source: messages[messageIndex],
          target: messages[otherIndex],
          strength: calculateRelationStrength(topic, otherTopic)
        });
      }
    });
  });

  return relations;
}

function extractTopics(messages: ChatMessage[]): string[][] {
  return messages.map(msg => {
    const words = msg.content.toLowerCase().split(/\W+/);
    return words.filter(word => word.length > 3); // Filter out short words
  });
}

function areTopicsRelated(topic1: string[], topic2: string[]): boolean {
  const commonWords = topic1.filter(word => topic2.includes(word));
  return commonWords.length >= 2; // At least 2 common meaningful words
}

function calculateRelationStrength(topic1: string[], topic2: string[]): number {
  const commonWords = topic1.filter(word => topic2.includes(word));
  return commonWords.length / Math.max(topic1.length, topic2.length);
}

function analyzeTimeDistribution(messages: ChatMessage[]) {
  const hourDistribution = new Array(24).fill(0);
  
  messages.forEach(msg => {
    const hour = msg.timestamp.getHours();
    hourDistribution[hour]++;
  });

  return {
    hourDistribution,
    mostActiveHour: hourDistribution.indexOf(Math.max(...hourDistribution))
  };
}

function getTimeRange(messages: ChatMessage[]) {
  return {
    start: new Date(Math.min(...messages.map(m => m.timestamp.getTime()))),
    end: new Date(Math.max(...messages.map(m => m.timestamp.getTime())))
  };
}

function sortPatternsByFrequency(patterns: Pattern[]): Pattern[] {
  return [...patterns].sort((a, b) => b.frequency - a.frequency);
}