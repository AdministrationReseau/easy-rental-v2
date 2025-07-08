import React from 'react';

type VariantType = 'default' | 'secondary' | 'success' | 'destructive' | 'error' | 'warning' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: VariantType;
    className?: string;
    children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ variant = 'default', className = '', children, ...props }, ref) => {
        const variantClasses = {
            default: 'bg-primary-100 text-primary-700',
            secondary: 'bg-gray-100 text-gray-800',
            success: 'bg-success-100 text-success-700',
            destructive: 'bg-gray-100 text-gray-800',
            error: 'bg-error-100 text-error-700',
            warning: 'bg-warning-100 text-warning-700',
            outline: 'border border-border-light dark:border-border-dark bg-transparent text-text-light dark:text-text-dark',
        };

        return (
            <div
                ref={ref}
                role="status"
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses[variant]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Badge.displayName = 'Badge';
