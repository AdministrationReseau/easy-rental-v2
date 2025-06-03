'use client';
import { useTranslation } from "react-i18next";


export default function Help() {
  const { t } = useTranslation('client');

  return (
    <div>
            {t('help.title')}
            help
    </div>
  
  );
}

