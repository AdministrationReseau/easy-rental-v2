import { CircleArrowLeft} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type ProfileTabsPageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function ProfileTabsPageLayout({ title, children }: ProfileTabsPageLayoutProps) {
  const router = useRouter();
  const { t } = useTranslation('client');
  const tabs = [
    'personal',
    'bookings',
    'favorites',
    'payments',
    'preferences',
    'settings',
  ];

  const hasActiveTab = tabs.some(tab => t(`profile.tabs.${tab}`) === title);


  return (
    <div className="flex text-text-light bg-background-light dark:text-gray-400 dark:bg-background-dark rounded-lg">
      <main className="flex-1 p-8 rounded-xl">
        <div className="flex items-center mb-4">
          <CircleArrowLeft onClick={() => router.back()} />
          <h1 className="font-bold text-3xl ml-2">{title}</h1>
        </div>

        <div>
          {hasActiveTab ? (
            <div className="p-4 flex gap-6 justify-center">
            <aside className="w-64 md:w-1/3 hidden md:block rounded-xl border shadow-sm p-4">
              <ul className="space-y-4 font-medium text-sm">
                {tabs.map(tab => {
                  const label = t(`profile.tabs.${tab}`);
                  const isActive = label === title;
                  return (
                    <li
                      key={tab}
                      className={isActive ? 'text-primary-600' : 'text-gray-600'}
                    >
                      {label}
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div className="w-full md:w-2/3 lg:4/5 rounded-xl">
            {children}
          </div>
              
          </div>
         ):(
          <div className="w-full rounded-xl">
            {children}
          </div>
         )}


          
        </div>
      </main>
    </div>
  );
}