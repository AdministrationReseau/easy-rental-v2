import React from 'react';
import {AuthLayoutProps} from "@/types/models/auth";

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">{title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
