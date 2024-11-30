import React, { useState } from 'react';
import { Shield, Lock, Server } from 'lucide-react';
import { ProviderSelect } from './ProviderSelect';
import { AuthButton } from './AuthButton';
import { Spinner } from './Spinner';
import { PricingSection } from './PricingSection';
import { EmailProvider } from '../types/provider';
import { useThemeStore } from '../store/themeStore';

interface LoginScreenProps {
  onSuccess: (token: string, provider: EmailProvider) => void;
  loading?: boolean;
  error?: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onSuccess, 
  loading = false,
  error = null,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<EmailProvider | null>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen cyber-grid relative overflow-hidden
      ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <Shield className={`w-20 h-20 ${isDark ? 'text-blue-400' : 'text-blue-600'} relative`} />
            </div>
            <Lock className={`w-12 h-12 ${isDark ? 'text-blue-400' : 'text-blue-600'} animate-pulse`} />
            <Server className={`w-16 h-16 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>

          <div className={`${isDark 
            ? 'bg-gray-800/50 text-white' 
            : 'bg-white/80 text-gray-900'} 
            backdrop-blur-xl rounded-2xl p-8 mb-8 glow max-w-2xl mx-auto`}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Email Sanitizer
            </h1>
            <div className="flex flex-col items-center space-y-4">
              <p className={`text-lg max-w-md ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Protect your inbox with advanced AI-powered threat detection and real-time email sanitization
              </p>
              
              <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Shield className="w-4 h-4" />
                <span>Military-grade encryption</span>
                <span className="mx-2">•</span>
                <Lock className="w-4 h-4" />
                <span>Advanced threat detection</span>
              </div>
            </div>
          </div>
          
          {error && (
            <div className={`mb-6 p-4 ${isDark 
              ? 'bg-red-900/50 text-red-200 border-red-700/50' 
              : 'bg-red-100 text-red-800 border-red-200'} 
              rounded-lg border backdrop-blur-xl max-w-md mx-auto`}>
              {error}
            </div>
          )}
          
          <div className="mb-8">
            <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Choose Your Email Provider
            </h2>
            <ProviderSelect 
              onSelect={(provider) => setSelectedProvider(provider)} 
            />
          </div>

          <div className="flex justify-center mb-16">
            {loading ? (
              <Spinner />
            ) : selectedProvider && (
              <AuthButton 
                provider={selectedProvider}
                onSuccess={(token) => onSuccess(token, selectedProvider)} 
                disabled={loading} 
              />
            )}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />
    </div>
  );
};