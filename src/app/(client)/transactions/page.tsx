'use client';
import { useTranslation } from "react-i18next";


export default function ClientTransactions() {
  const { t } = useTranslation('client');

  return (
    <div>
            <h1 className="text-3xl font-bold mb-4">{t('transactions.title')}</h1>
            <p>{t('transactions.content')}</p>
    </div>
  
  );
}

