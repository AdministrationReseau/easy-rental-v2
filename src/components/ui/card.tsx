import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    className?: string;
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`flex flex-col space-y-1.5 p-6 ${className}`}
            {...props}
        />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className = '', ...props }, ref) => (
        <h3
            ref={ref}
            className={`text-lg font-semibold leading-none tracking-tight ${className}`}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className = '', ...props }, ref) => (
        <p
            ref={ref}
            className={`text-sm text-gray-500 ${className}`}
            {...props}
        />
    )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`p-6 pt-0 ${className}`}
            {...props}
        />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`flex items-center p-6 pt-0 ${className}`}
            {...props}
        />
    )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
