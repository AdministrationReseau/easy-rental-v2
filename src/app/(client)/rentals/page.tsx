'use client';
import { useTranslation } from "react-i18next";


export default function ClientRentals() {
  const { t } = useTranslation('client');

  return (
    <div>
            <h1 className="text-3xl font-bold mb-4">{t('rentals.title')}</h1>
            <p>{t('rentals.content')}</p>
    </div>
  
  );
}

