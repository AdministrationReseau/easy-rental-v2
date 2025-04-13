import React from 'react';

type VariantType = 'default' | 'secondary' | 'destructive' | 'outline' | 'success';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: VariantType;
    className?: string;
    children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ variant = 'default', className = '', children, ...props }, ref) => {
        const variantClasses = {
            default: 'bg-primary text-primary-foreground',
            secondary: 'bg-secondary text-secondary-foreground',
            destructive: 'bg-destructive text-destructive-foreground',
            outline: 'border border-input bg-transparent text-foreground',
            success: 'bg-green-100 text-green-800 border border-green-200',
        };

        return (
            <div
                ref={ref}
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Badge.displayName = 'Badge';
