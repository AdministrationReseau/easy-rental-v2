'use client';
import ProfileTabsPageLayout from "@/components/layout/ProfileTabsPageLauyout";
import { useTranslation } from "react-i18next";


export default function ContactSupport() {
  const { t } = useTranslation('client');

  return (
    <ProfileTabsPageLayout title={t('profile.help.contact_support')}>
     
     contact
    </ProfileTabsPageLayout>
  
  );
}

