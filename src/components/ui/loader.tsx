import React from 'react';
import {useTranslation} from "react-i18next";

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullScreen?: boolean;
    showText?: boolean;
    className?: string;
    progress?: boolean; // Not implemented visually, but kept for API compatibility
    message?: string;
}

const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-4',
    xl: 'w-16 h-16 border-4',
};

const Loader: React.FC<LoaderProps> = ({
                                                                       size = 'lg',
                                                                       fullScreen = false,
                                                                       showText = true,
                                                                       className = '',
                                                                       message = 'Chargement...',
                                                                   }) => {
  const { t } = useTranslation('common');
    const spinner = (
      <div className={`flex flex-col items-center justify-center ${className}`}>
          <div
            className={`animate-spin rounded-full border-t-transparent border-primary-500 border-solid ${sizeClasses[size]}`}
          />
          {showText && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('common.loading') || message }</p>
          )}
      </div>
    );

    if (fullScreen) {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60 z-[9999]">
              {spinner}
          </div>
        );
    }

    return spinner;
};

export default Loader;