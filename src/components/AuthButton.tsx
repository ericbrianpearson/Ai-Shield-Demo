import React from 'react';
import { Mail, Shield } from 'lucide-react';
import { providers } from '../config/providers';
import { EmailProvider } from '../types/provider';
import { useThemeStore } from '../store/themeStore';

interface AuthButtonProps {
  provider: EmailProvider;
  onSuccess: () => void;
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ 
  provider, 
  onSuccess, 
  disabled 
}) => {
  const providerConfig = providers[provider];
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onSuccess}
      disabled={disabled}
      className={`
        flex items-center gap-3 px-8 py-4 rounded-xl 
        transition-all duration-300 transform
        ${disabled 
          ? isDark
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
          : isDark
            ? 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 shadow-lg hover:shadow-blue-500/25 border border-blue-500'
            : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 shadow-lg hover:shadow-blue-600/25 border border-blue-400'
        }
        backdrop-blur-xl`}
    >
      <Mail className={`w-5 h-5 ${disabled ? 'opacity-50' : ''}`} />
      <span className="font-medium">Demo Login with {providerConfig.name}</span>
      <Shield className={`w-4 h-4 ml-2 ${disabled ? 'opacity-50' : ''}`} />
    </button>
  );
};