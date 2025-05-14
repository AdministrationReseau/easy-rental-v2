"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/auth/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams?.get('returnUrl') || '/';
    const { t } = useTranslation('auth');

    const { login, isLoading, error, isAuthenticated, user } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && !isLoading && user) {
            if (user.role === 'admin') {
                router.push('/organization');
            } else {
                router.push('/client');
            }
        }
    }, [isAuthenticated, isLoading, router, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            // Appel de login sans spécifier de rôle - le backend retournera le rôle
            await login(formData.username, formData.password);

            // La redirection sera gérée par l'effet ci-dessus lorsque isAuthenticated deviendra true
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : t('signin.errors.generic'));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // If already authenticated and waiting for redirect
    if (isAuthenticated && !isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-text-dark">{t('signin.redirecting')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-background-dark">
            {/* Left side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Card className="bg-white dark:bg-background-dark shadow-xl border-0">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-text-dark">
                                {t('signin.title')}
                            </CardTitle>
                            <p className="text-center text-sm text-gray-600 dark:text-text-dark/70">
                                {t('signin.subtitle')}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {(errorMessage || error) && (
                                    <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                                    {errorMessage || error}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <Input
                                        label={t('signin.fields.username')}
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder={t('signin.placeholders.username')}
                                    />

                                    <Input
                                        label={t('signin.fields.password')}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-text-dark">
                                            {t('signin.remember_me')}
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                                            {t('signin.forgot_password')}
                                        </Link>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                                >
                                    {isLoading ? t('signin.signing_in') : t('signin.sign_in_button')}
                                </Button>

                                <div className="text-center text-sm">
                                    <p className="text-gray-600 dark:text-text-dark/70">
                                        {t('signin.no_account')}{' '}
                                        <Link
                                            href={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`}
                                            className="font-medium text-primary-600 hover:text-primary-500"
                                        >
                                            {t('signin.sign_up')}
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right side - Branding */}
            <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:items-center lg:relative bg-gradient-to-br from-primary-500 to-primary-600">
                <div className="max-w-md text-center space-y-6 px-8">
                    <div className="flex justify-center mb-8">
                        <div className="relative w-32 h-32">
                            <Image
                                src="/images/logo-white.png"
                                alt="Easy Rental Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        {t('signin.branding.title')}
                    </h1>

                    <p className="text-lg text-primary-100">
                        {t('signin.branding.subtitle')}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mt-12">
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-white/10 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <p className="text-sm text-primary-100">{t('signin.branding.features.quick')}</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-white/10 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <p className="text-sm text-primary-100">{t('signin.branding.features.secure')}</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-white/10 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-sm text-primary-100">{t('signin.branding.features.support')}</p>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-white/5 rounded-full" />
                </div>
            </div>
        </div>
    );
}
