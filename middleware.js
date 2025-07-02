import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Liste des langues supportées
const locales = ['en', 'fr'];
const defaultLocale = 'fr';

// Fonction pour obtenir la langue préférée de l'utilisateur à partir de la requête
function getLocale(request) {
  // Negotiator attend un objet avec une propriété headers qui contient les en-têtes de requête
  const headers = Object.fromEntries(request.headers);
  const languages = new Negotiator({ headers }).languages();

  try {
    return match(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

export function middleware(request) {
  // Vérifier si le chemin contient déjà une locale
  const { pathname } = request.nextUrl;

  // Vérifier si le chemin commence par une locale supportée
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Si le chemin a déjà une locale, ne rien faire
  if (pathnameHasLocale) return;

  // Vérifier s'il s'agit d'un fichier statique (pas besoin de redirection)
  if (pathname.startsWith('/locales/') ||
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/_next/') ||
      pathname.includes('.')) {
    return;
  }

  // Rediriger vers la locale par défaut ou celle détectée
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Exclure les fichiers statiques et les API routes
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images|locales).*)',
  ],
};
