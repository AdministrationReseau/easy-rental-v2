import React, { useEffect, useState } from 'react';

interface SheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
}

interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const Sheet = ({ children, isOpen, onClose, position = 'right' }: SheetProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the duration of the transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black/40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Sheet content */}
      <div 
        className={`
          fixed inset-y-0 ${position}-0 w-full max-w-xs bg-white shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen 
            ? 'translate-x-0' 
            : position === 'left' 
              ? '-translate-x-full' 
              : 'translate-x-full'
          }
        `}
      >
        {children}
      </div>
    </div>
  );
};

export const SheetContent = ({ children, className = '' }: SheetContentProps) => (
  <div className={`p-6 h-full overflow-y-auto ${className}`}>
    {children}
  </div>
);

export const SheetHeader = ({ children, className = '' }: SheetHeaderProps) => (
  <div className={`px-6 py-4 border-b ${className}`}>
    {children}
  </div>
);

export const SheetTitle = ({ children, className = '' }: SheetTitleProps) => (
  <h2 className={`text-lg font-semibold ${className}`}>
    {children}
  </h2>
);

export const SheetTrigger = ({ children, onClick, className = '' }: SheetTriggerProps) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center ${className}`}
  >
    {children}
  </button>
);