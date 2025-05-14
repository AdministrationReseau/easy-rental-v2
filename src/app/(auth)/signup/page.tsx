"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from '@/hooks/auth/useAuth';

export default function SignUp() {
    const router = useRouter();
    const { register, isLoading, error } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        // Password validation
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas');
            return;
        }

        if (formData.password.length < 6) {
            setErrorMessage('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        try {
            // Combine first and last name for the full name
            const fullName = `${formData.firstName} ${formData.lastName}`;
            await register(fullName, formData.email, formData.password);

            // Redirect after successful registration
            router.push('/');
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'inscription');
        }
    };

    return (
      <AuthLayout
        title="Créer un compte"
        subtitle="Commencez à louer des véhicules dès aujourd'hui"
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
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                              Prénom
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          />
                      </div>
                      <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                              Nom
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          />
                      </div>
                  </div>

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
                        minLength={6}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <p className="mt-1 text-xs text-gray-500">Au moins 6 caractères</p>
                  </div>

                  <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirmer le mot de passe
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                  </div>
              </div>

              <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                      {isLoading ? 'Création du compte...' : 'Créer un compte'}
                  </button>
              </div>

              <div className="text-center">
                  <p className="text-sm text-gray-600">
                      Déjà un compte ?{' '}
                      <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                          Connectez-vous
                      </Link>
                  </p>
              </div>
          </form>
      </AuthLayout>
    );
}