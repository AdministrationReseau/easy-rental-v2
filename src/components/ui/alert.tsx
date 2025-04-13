import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
}

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    className?: string;
    children: React.ReactNode;
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className = '', children, ...props }, ref) => (
        <div
            ref={ref}
            role="alert"
            className={`relative w-full rounded-lg border border-gray-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-950 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
);

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
    ({ className = '', children, ...props }, ref) => (
        <h5
            ref={ref}
            className={`mb-1 font-medium leading-none ${className}`}
            {...props}
        >
            {children}
        </h5>
    )
);

AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
    ({ className = '', children, ...props }, ref) => (
        <div
            ref={ref}
            className={`text-sm text-gray-700 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
);

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
