'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		debug: process.env.NODE_ENV === 'development',

		interpolation: {
			escapeValue: false, // React already escapes values
		},

		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},

		ns: ['common', 'client', 'organization'],
		defaultNS: 'common',

		supportedLngs: ['en', 'fr'],

		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
		},
	});

export default i18n;

