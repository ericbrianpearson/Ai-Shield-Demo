import { EmailThread } from '../types/email';
import { mockEmails } from './mockData';

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchEmails(): Promise<EmailThread[]> {
  await delay(1000); // Simulate network delay
  return mockEmails;
}

export async function analyzeEmail(thread: EmailThread): Promise<EmailThread> {
  await delay(500); // Simulate AI processing time
  return thread;
}