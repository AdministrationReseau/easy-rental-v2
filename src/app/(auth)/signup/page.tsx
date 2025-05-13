"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/auth/useAuth';
import { UserRole } from '@/types/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClientSignUp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams?.get('returnUrl') || '/client';
    const { t } = useTranslation('auth');

    const { register, isLoading, error } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: 'user' as UserRole,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage(t('signup.errors.password_mismatch'));
            return;
        }

        if (formData.password.length < 6) {
            setErrorMessage(t('signup.errors.password_length'));
            return;
        }

        // Validation du username
        if (!formData.username) {
            setErrorMessage(t('signup.errors.username_required'));
            return;
        }

        try {
            // Combine first and last name
            const fullName = `${formData.firstName} ${formData.lastName}`;
            await register(
                fullName,
                formData.email,
                formData.password,
                'user',
                formData.username,
                formData.phoneNumber
            );

            // Redirect after successful registration
            router.push(returnUrl);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : t('signup.errors.generic'));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-background-dark">
            {/* Left side - Branding */}
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
                        {t('signup.branding.title')}
                    </h1>

                    <p className="text-lg text-primary-100">
                        {t('signup.branding.subtitle')}
                    </p>

                    <div className="space-y-4 mt-12">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                            <p className="text-primary-100">{t('signup.branding.benefits.variety')}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-3">
                            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                            <p className="text-primary-100">{t('signup.branding.benefits.price')}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-3">
                            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                            <p className="text-primary-100">{t('signup.branding.benefits.service')}</p>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-white/5 rounded-full" />
                </div>
            </div>

            {/* Right side - Sign Up Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Card className="bg-white dark:bg-background-dark shadow-xl border-0">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-text-dark">
                                {t('signup.title')}
                            </CardTitle>
                            <p className="text-center text-sm text-gray-600 dark:text-text-dark/70">
                                {t('signup.subtitle')}
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input
                                            label={t('signup.fields.first_name')}
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            label={t('signup.fields.last_name')}
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Nouveau champ username */}
                                    <Input
                                        label={t('signup.fields.username')}
                                        id="username"
                                        name="username"
                                        autoComplete="username"
                                        required
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder={t('signup.placeholders.username')}
                                    />

                                    <Input
                                        label={t('signup.fields.email')}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="exemple@email.com"
                                    />

                                    <Input
                                        label={t('signup.fields.phone')}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="+237 6XX XXX XXX"
                                    />

                                    <Input
                                        label={t('signup.fields.password')}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                    />

                                    <Input
                                        label={t('signup.fields.confirm_password')}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="text-xs text-gray-500 dark:text-text-dark/70">
                                    {t('signup.password_requirements')}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                                >
                                    {isLoading ? t('signup.creating_account') : t('signup.create_account')}
                                </Button>

                                <div className="text-center text-sm">
                                    <p className="text-gray-600 dark:text-text-dark/70">
                                        {t('signup.already_have_account')}{' '}
                                        <Link
                                            href={`/signin?returnUrl=${encodeURIComponent(returnUrl)}`}
                                            className="font-medium text-primary-600 hover:text-primary-500"
                                        >
                                            {t('signup.sign_in')}
                                        </Link>
                                    </p>
                                </div>

                                <div className="text-center text-sm">
                                    <p className="text-gray-600 dark:text-text-dark/70">
                                        {t('signup.are_you_agency')}{' '}
                                        <Link
                                            href="/subscription"
                                            className="font-medium text-primary-600 hover:text-primary-500"
                                        >
                                            {t('signup.register_agency')}
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
