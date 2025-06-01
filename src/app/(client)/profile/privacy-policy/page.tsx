'use client';
import ProfileTabsPageLayout from "@/components/layout/ProfileTabsPageLauyout";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation('client');




  return (
    <ProfileTabsPageLayout title={t('profile.help.privacy_policy.title')}>

        <div>
            {t('profile.help.privacy_policy.content', { interpolation: { escapeValue: false } })
            }
        </div>
      
    </ProfileTabsPageLayout>
  
  );
}

