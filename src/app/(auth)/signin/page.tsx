"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from '@/hooks/auth/useAuth';
import { UserRole } from '@/types/auth';

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams?.get('returnUrl') || '/';

    const { login, isLoading, error, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push(returnUrl);
        }
    }, [isAuthenticated, isLoading, router, returnUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            // No need to pass a role parameter - it will be determined by the backend
            await login(formData.email, formData.password);
            // Redirect to the return URL after successful login
            router.push(returnUrl);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion');
        }
    };

    // If already authenticated and waiting for redirect
    if (isAuthenticated && !isLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p>Redirection en cours...</p>
              </div>
          </div>
        );
    }

    return (
      <AuthLayout
        title="Connexion"
        subtitle="Accédez à votre compte de location de véhicules"
      >
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {(errorMessage || error) && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="text-sm text-red-700">
                            {errorMessage || error}
                        </div>
                    </div>
                </div>
              )}

              <div className="rounded-md space-y-4">
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Adresse email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="exemple@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                  </div>
                  <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Mot de passe
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                  </div>
                  <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                          Type de compte
                      </label>
                      <select
                        id="role"
                        name="role"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                      >
                          <option value="user">Utilisateur</option>
                          <option value="admin">Administrateur</option>
                          <option value="guest">Invité</option>
                      </select>
                  </div>
              </div>

              <div className="flex items-center justify-between">
                  <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                          Se souvenir de moi
                      </label>
                  </div>

                  <div className="text-sm">
                      <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                          Mot de passe oublié ?
                      </Link>
                  </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>

              <div className="text-center">
                  <p className="text-sm text-gray-600">
                      Pas encore de compte ?{' '}
                      <Link href={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`} className="font-medium text-blue-600 hover:text-blue-500">
                          Inscrivez-vous
                      </Link>
                  </p>
              </div>
          </form>
      </AuthLayout>
    );
}