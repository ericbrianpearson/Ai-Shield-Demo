import React, { useState } from 'react';
import { format } from 'date-fns';
import { Shield, AlertTriangle, Ban, ChevronDown, ChevronUp } from 'lucide-react';
import { EmailThread } from '../types/email';
import { useThemeStore } from '../store/themeStore';

interface EmailListProps {
  threads: EmailThread[];
}

const ThreatIcon = ({ level }: { level: EmailThread['threatLevel'] }) => {
  switch (level) {
    case 'safe':
      return <Shield className="w-5 h-5 text-green-500" />;
    case 'suspicious':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'malicious':
      return <Ban className="w-5 h-5 text-red-500" />;
  }
};

const ThreatBadge = ({ level }: { level: EmailThread['threatLevel'] }) => {
  const colors = {
    safe: 'bg-green-100 text-green-800 border-green-200',
    suspicious: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    malicious: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level]} border`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
};

export const EmailList: React.FC<EmailListProps> = ({ threads }) => {
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (threads.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No emails processed yet</p>
      </div>
    );
  }

  const handleEmailClick = (id: string) => {
    setExpandedEmail(expandedEmail === id ? null : id);
  };

  return (
    <div className="divide-y divide-gray-200">
      {threads.map((thread) => (
        <div 
          key={thread.id} 
          className={`${isDark 
            ? 'hover:bg-gray-800/50' 
            : 'hover:bg-gray-50'} 
            transition-colors duration-200 cursor-pointer`}
          onClick={() => handleEmailClick(thread.id)}
        >
          <div className="p-4">
            <div className="flex items-center gap-4">
              <ThreatIcon level={thread.threatLevel} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                      {thread.from}
                    </p>
                    <ThreatBadge level={thread.threatLevel} />
                  </div>
                  <p className="text-sm text-gray-500">
                    {format(new Date(thread.date), 'MMM d, h:mm a')}
                  </p>
                </div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} truncate`}>
                  {thread.subject}
                </p>
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                    {thread.snippet}
                  </p>
                  {expandedEmail === thread.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {expandedEmail === thread.id && (
              <div className={`mt-4 p-4 rounded-lg ${isDark 
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-gray-50 border border-gray-200'}`}>
                <div className="space-y-2">
                  <h4 className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    Threat Analysis
                  </h4>
                  {thread.threatLevel === 'malicious' && (
                    <div className="text-sm text-red-500">
                      ⚠️ This email contains potentially harmful content:
                      <ul className="list-disc ml-5 mt-1">
                        <li>Suspicious sender domain</li>
                        <li>Urgency manipulation tactics</li>
                        <li>Request for sensitive information</li>
                      </ul>
                    </div>
                  )}
                  {thread.threatLevel === 'suspicious' && (
                    <div className="text-sm text-yellow-500">
                      ⚠️ This email shows some suspicious patterns:
                      <ul className="list-disc ml-5 mt-1">
                        <li>Unusual sender address</li>
                        <li>Unexpected attachment or link</li>
                        <li>Irregular formatting</li>
                      </ul>
                    </div>
                  )}
                  {thread.threatLevel === 'safe' && (
                    <div className="text-sm text-green-500">
                      ✓ This email appears to be safe:
                      <ul className="list-disc ml-5 mt-1">
                        <li>Verified sender domain</li>
                        <li>No suspicious patterns detected</li>
                        <li>Clean content analysis</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};