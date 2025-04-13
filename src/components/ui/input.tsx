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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                {...props}
                disabled={disabled}
                className={`
          w-full px-3 py-2 rounded-md border mt-1
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          text-sm placeholder-gray-400
          transition duration-150 ease-in-out
          ${className.input || ''}
        `}
            />
            {error && (
                <p className={`mt-1 text-sm text-red-500 ${className.error || ''}`}>
                    {error}
                </p>
            )}
        </div>
    );
};
