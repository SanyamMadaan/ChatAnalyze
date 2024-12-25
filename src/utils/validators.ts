export function isValidWhatsAppFormat(content: string): boolean {
  const lines = content.split('\n');
  const timestampRegex = /^\[\d{1,2}\/\d{1,2}\/\d{2,4},\s\d{1,2}:\d{2}:\d{2}\s[AP]M\]/;
  
  // Check at least one line matches WhatsApp format
  return lines.some(line => timestampRegex.test(line));
}