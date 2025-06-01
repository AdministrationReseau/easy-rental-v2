'use client';
import ProfileTabsPageLayout from "@/components/layout/ProfileTabsPageLauyout";
import { useTranslation } from "react-i18next";

export default function PaymentMethods() {
  const { t } = useTranslation('client');




  return (
    <ProfileTabsPageLayout title={t('profile.payments.title')}>
     
        ok oh
      
    </ProfileTabsPageLayout>
  
  );
}

