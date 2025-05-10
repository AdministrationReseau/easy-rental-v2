'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

interface DialogCloseProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
                                                  open,
                                                  onOpenChange,
                                                  children,
                                                  className = ''
                                              }) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';

            // Add event listener for custom close event
            const handleDialogClose = () => {
                onOpenChange(false);
            };

            document.addEventListener('dialog-close', handleDialogClose);

            return () => {
                document.body.style.overflow = 'unset';
                document.removeEventListener('dialog-close', handleDialogClose);
            };
        }
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/60 dark:bg-black/80 transition-opacity z-40"
                onClick={() => onOpenChange(false)}
            />
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
                role="dialog"
            >
                {children}
            </div>
        </>
    );
};

export const DialogContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => (
    <div className={`
    bg-card-light dark:bg-card-dark
    text-text-light dark:text-text-dark
    rounded-card shadow-xl w-full max-w-md
    max-h-[85vh] overflow-y-auto
    border border-border-light dark:border-border-dark
    animate-in fade-in-0 zoom-in-95
    ${className}
  `}>
        {children}
    </div>
);

export const DialogHeader: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-b border-border-light dark:border-border-dark ${className}`}>
        {children}
    </div>
);

export const DialogTitle: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {

    return (
        <h2 className={`text-lg font-semibold text-text-light dark:text-text-dark ${className}`}>
            {children}
        </h2>
    );
};

export const DialogTrigger: React.FC<{
    asChild?: boolean;
    className?: string;
    children: React.ReactNode;
}> = ({ asChild, className = '', children }) => {
    if (asChild) {
        return React.Children.only(children);
    }

    return (
        <div className={className}>
            {children}
        </div>
    );
};

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
    ({ children, asChild = false, className = '' }, ref) => {
        const { t } = useTranslation();

        const handleClose = () => {
            // Find the closest dialog element
            const dialogElement = document.querySelector('[role="dialog"]');
            if (dialogElement) {
                const closeEvent = new CustomEvent('dialog-close', {
                    bubbles: true,
                    cancelable: true
                });
                dialogElement.dispatchEvent(closeEvent);
            }
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement, {
                onClick: (e: React.MouseEvent) => {
                    handleClose();
                    (children as React.ReactElement).props?.onClick?.(e);
                },
                ref,
                className: `${(children as React.ReactElement).props?.className || ''} ${className}`.trim()
            });
        }

        return (
            <button
                type="button"
                ref={ref}
                onClick={handleClose}
                className={`text-text-light-secondary dark:text-text-light-secondary hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
                aria-label={t('common:close')}
            >
                {children}
            </button>
        );
    }
);

DialogClose.displayName = 'DialogClose';

export { DialogClose };
