import { EmailThread } from '../types/email';
import { format, subHours, subDays } from 'date-fns';

// Generate a mix of safe, suspicious, and malicious emails
export const mockEmails: EmailThread[] = [
  // Malicious Emails
  {
    id: '1',
    snippet: 'Dear valued customer, we have detected unusual activity on your account. Please verify your identity by clicking the secure link below...',
    subject: 'Security Alert: Unusual Account Activity Detected',
    from: 'security@fakebank.com',
    date: format(subHours(new Date(), 2), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX', 'UNREAD'],
    threatLevel: 'malicious'
  },
  {
    id: '2',
    snippet: 'Congratulations! You have won $1,000,000 in the International Lottery. To claim your prize, please provide your banking details...',
    subject: 'YOU WON! Claim Your Prize Now',
    from: 'lottery@scam-example.com',
    date: format(subHours(new Date(), 4), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX'],
    threatLevel: 'malicious'
  },
  
  // Suspicious Emails
  {
    id: '3',
    snippet: 'Your Netflix account will be suspended. Please update your payment information within 24 hours...',
    subject: 'Netflix Payment Failed - Action Required',
    from: 'netflix.customer@service-notice.com',
    date: format(subHours(new Date(), 6), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX', 'UNREAD'],
    threatLevel: 'suspicious'
  },
  {
    id: '4',
    snippet: 'Important document shared with you. Click to access the secure document vault...',
    subject: 'Secure Document Shared',
    from: 'docs@file-share-system.net',
    date: format(subHours(new Date(), 8), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX'],
    threatLevel: 'suspicious'
  },
  
  // Safe Business Emails
  {
    id: '5',
    snippet: 'Hi team, Please find attached the Q1 2024 financial report and performance metrics...',
    subject: 'Q1 2024 Financial Report',
    from: 'finance@company.com',
    date: format(subHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX', 'IMPORTANT'],
    threatLevel: 'safe'
  },
  {
    id: '6',
    snippet: 'The project timeline has been updated. Please review the attached Gantt chart...',
    subject: 'Updated Project Timeline',
    from: 'pm@company.com',
    date: format(subHours(new Date(), 3), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX'],
    threatLevel: 'safe'
  },
  
  // Safe Personal Emails
  {
    id: '7',
    snippet: 'Hey! Are we still on for dinner this Friday? I found this great new restaurant...',
    subject: 'Friday Dinner Plans',
    from: 'friend@gmail.com',
    date: format(subHours(new Date(), 5), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX', 'PERSONAL'],
    threatLevel: 'safe'
  },
  {
    id: '8',
    snippet: 'Your order #123456 has been shipped. Track your package with the following number...',
    subject: 'Order Shipped - Track Your Package',
    from: 'orders@amazon.com',
    date: format(subHours(new Date(), 7), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX'],
    threatLevel: 'safe'
  },
  
  // More Malicious Emails
  {
    id: '9',
    snippet: 'URGENT: Your account access will be terminated. Verify your identity now...',
    subject: 'Account Termination Notice',
    from: 'support@secure-verify.net',
    date: format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX'],
    threatLevel: 'malicious'
  },
  {
    id: '10',
    snippet: 'Investment opportunity: Guaranteed 500% returns in crypto mining operation...',
    subject: 'Exclusive Investment Opportunity',
    from: 'investor@crypto-gains.com',
    date: format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX'],
    threatLevel: 'malicious'
  }
];

// Add 40 more emails with varied content and threat levels
for (let i = 11; i <= 50; i++) {
  const threatTypes = ['safe', 'suspicious', 'malicious'];
  const threatLevel = threatTypes[Math.floor(Math.random() * 3)] as 'safe' | 'suspicious' | 'malicious';
  
  const templates = {
    safe: [
      {
        subject: 'Team Meeting Notes',
        from: 'colleague@company.com',
        snippet: 'Here are the key points discussed in today\'s meeting...'
      },
      {
        subject: 'Your Monthly Newsletter',
        from: 'newsletter@legitimate-service.com',
        snippet: 'Check out this month\'s top stories and updates...'
      },
      {
        subject: 'Invoice Paid',
        from: 'billing@service.com',
        snippet: 'Thank you for your payment. Here\'s your receipt...'
      }
    ],
    suspicious: [
      {
        subject: 'Urgent: Account Verification Required',
        from: 'security@bank-verify.net',
        snippet: 'Your account requires immediate verification...'
      },
      {
        subject: 'Package Delivery Failed',
        from: 'delivery@shipping-notice.com',
        snippet: 'Your package delivery failed. Click here to reschedule...'
      },
      {
        subject: 'HR: Salary Update',
        from: 'hr@company-portal.net',
        snippet: 'Important changes to your salary structure...'
      }
    ],
    malicious: [
      {
        subject: 'Your Account Has Been Compromised',
        from: 'security@account-verify.net',
        snippet: 'Unauthorized access detected. Reset your password now...'
      },
      {
        subject: 'Claim Your Free Gift Card',
        from: 'rewards@prize-winner.com',
        snippet: 'You\'ve been selected to receive a $500 gift card...'
      },
      {
        subject: 'Urgent Wire Transfer Required',
        from: 'ceo@company-urgent.com',
        snippet: 'I need you to process an urgent wire transfer...'
      }
    ]
  };

  const template = templates[threatLevel][Math.floor(Math.random() * 3)];
  
  mockEmails.push({
    id: i.toString(),
    ...template,
    date: format(subHours(new Date(), i * 2), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    labels: ['INBOX'],
    threatLevel
  });
}

export const mockUser = {
  email: 'demo@emailsanitizer.com',
  name: 'Demo User',
  picture: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff'
};