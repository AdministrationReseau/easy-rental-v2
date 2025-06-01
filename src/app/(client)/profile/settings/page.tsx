'use client';
import ProfileTabsPageLayout from "@/components/layout/ProfileTabsPageLauyout";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation('client');




  return (
    <ProfileTabsPageLayout title={t('profile.tabs.settings')}>
     
        settings
      
    </ProfileTabsPageLayout>
  
  );
}

