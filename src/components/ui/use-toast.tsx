"use client";
import React from 'react';
import { useEffect, useState } from 'react';

type ToastProps = {
    title?: string;
    description?: string;
    type?: 'default' | 'success' | 'error' | 'warning';
    duration?: number;
};

type ToastContextType = {
    toast: (props: ToastProps) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([]);
    const [counter, setCounter] = useState(0);

    const toast = (props: ToastProps) => {
        const id = counter;
        setCounter(prevCounter => prevCounter + 1);
        setToasts(prevToasts => [...prevToasts, { ...props, id }]);
    };

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts(prevToasts => prevToasts.filter(t => t.id !== toasts[0].id));
            }, toasts[0].duration || 3000);
            return () => clearTimeout(timer);
        }
    }, [toasts]);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`p-4 rounded-md shadow-md transition-all transform duration-300 min-w-[300px] ${
                            t.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' :
                                t.type === 'error' ? 'bg-red-100 border-l-4 border-red-500' :
                                    t.type === 'warning' ? 'bg-yellow-100 border-l-4 border-yellow-500' :
                                        'bg-gray-100 border-l-4 border-gray-500'
                        }`}
                    >
                        {t.title && <h4 className="font-medium">{t.title}</h4>}
                        {t.description && <p className="text-sm text-gray-600">{t.description}</p>}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export { ToastContext };
export const toast = (props: ToastProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { toast } = useToast();
    toast(props);
};
