import { isValidWhatsAppFormat } from './validators';

export class FileImportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileImportError';
  }
}

export async function handleFileImport(file: File): Promise<string> {
  if (file.type !== 'text/plain') {
    throw new FileImportError('Please upload a .txt file');
  }

  const content = await file.text();
  
  if (!isValidWhatsAppFormat(content)) {
    throw new FileImportError('Invalid WhatsApp chat format');
  }

  return content;
}