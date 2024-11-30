import React from 'react';
import { Mail, MailCheck, MailPlus } from 'lucide-react';
import { providers } from '../config/providers';
import { EmailProvider } from '../types/provider';
import { useThemeStore } from '../store/themeStore';

interface ProviderSelectProps {
  onSelect: (provider: EmailProvider) => void;
}

const ProviderIcon = ({ id }: { id: EmailProvider }) => {
  switch (id) {
    case 'gmail':
      return <Mail className="w-6 h-6" />;
    case 'outlook':
      return <MailCheck className="w-6 h-6" />;
    case 'yahoo':
      return <MailPlus className="w-6 h-6" />;
    default:
      return <Mail className="w-6 h-6" />;
  }
};

export const ProviderSelect: React.FC<ProviderSelectProps> = ({ onSelect }) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {Object.values(providers).map((provider) => (
        <button
          key={provider.id}
          onClick={() => onSelect(provider.id as EmailProvider)}
          className={`
            flex items-center gap-3 p-4 rounded-xl transition-all duration-300
            ${isDark 
              ? 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 hover:border-blue-500 text-white'
              : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-400 text-gray-900'
            }
            backdrop-blur-xl border
            group hover:scale-105 transform`}
        >
          <div className={`
            p-2 rounded-lg 
            ${isDark
              ? 'bg-gray-700 group-hover:bg-blue-500/20'
              : 'bg-gray-100 group-hover:bg-blue-500/10'
            }`}>
            <ProviderIcon id={provider.id as EmailProvider} />
          </div>
          <span className="font-medium">{provider.name}</span>
        </button>
      ))}
    </div>
  );
};