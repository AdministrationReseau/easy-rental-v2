import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
    error?: string;
    label?: string;
    className?: {
        container?: string;
        input?: string;
        error?: string;
    };
}

export const Input: React.FC<InputProps> = ({
                                                error,
                                                label,
                                                className = {},
                                                disabled,
                                                ...props
                                            }) => {
    return (
        <div className={`w-full ${className.container || ''}`}>
            {label && (
                <label className="block text-sm font-medium text-text-light-secondary dark:text-text-light-secondary mb-1">
                    {label}
                </label>
            )}
            <input
                {...props}
                disabled={disabled}
                className={`
                    w-full px-3 py-2 rounded-md border mt-1
                    ${error ? 'border-error-500 focus:ring-error-200' : 'border-border-light dark:border-border-dark focus:ring-primary-200 dark:focus:ring-primary-700'}
                    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white dark:bg-surface-dark'}
                    focus:outline-none focus:ring-2 focus:border-primary-400
                    text-text-light dark:text-text-dark text-sm placeholder-text-light-tertiary dark:placeholder-text-light-tertiary
                    transition duration-150 ease-in-out
                    ${className.input || ''}
                `}
            />
            {error && (
                <p className={`mt-1 text-sm text-error-500 ${className.error || ''}`}>
                    {error}
                </p>
            )}
        </div>
    );
};
