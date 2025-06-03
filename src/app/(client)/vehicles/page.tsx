'use client';
import { useTranslation } from "react-i18next";


export default function ClientVehicules() {
  const { t } = useTranslation('client');

  return (
    <div>
            <h1 className="text-3xl font-bold mb-4">{t('vehicules.title')}</h1>
            
    </div>
  
  );
}

