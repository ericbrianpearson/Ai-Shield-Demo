import { EmailThread } from '../../types/email';
import { ManualEmailConfig } from '../../types/provider';
import { authenticateImap, fetchImapEmails } from './imap';
import { authenticatePop3, fetchPop3Emails } from './pop3';

export async function authenticateManualProvider(config: ManualEmailConfig) {
  try {
    return config.protocol === 'imap' 
      ? await authenticateImap(config)
      : await authenticatePop3(config);
  } catch (error) {
    throw new Error(`Failed to authenticate: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function fetchManualEmails(config: ManualEmailConfig): Promise<EmailThread[]> {
  try {
    return config.protocol === 'imap'
      ? await fetchImapEmails(config)
      : await fetchPop3Emails(config);
  } catch (error) {
    throw new Error(`Failed to fetch emails: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}