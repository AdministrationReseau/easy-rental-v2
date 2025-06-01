'use client';

import Link from "next/link";
import { ChevronRight, LucideIcon, CreditCard, Lock, HelpCircle, UserCircle, Heart, MessageCircle, ArrowLeftRight, KeyRound, ShieldCheck, Wallet } from "lucide-react";

export default function ClientProfile() {
  const options = [
    
       {
      title: "Gérer mon compte",
      items :[
        {
          icon: UserCircle,
          title: "Informations personnelles",
          link: "/profile/personal-info",
        },
        {
          icon: Lock,
          title: "Paramètres de sécurité",
          link: "/profile/security-settings",
        }
      ]
    },
    {
      title: "Paiement",
      items :[
        {
          icon: Wallet,
          title: "Récompenses et Portefeuille",
          link: "/profile/rewards",
        },
        {
          icon: CreditCard,
          title: "Moyens de paiement",
          link: "/profile/payment-methods",
        },
         {
          icon: ArrowLeftRight,
          title: "Transactions",
          link: "/profile/transactions",
        },
      ]
    },
    {
      title: "Votre activité",
      items :[
        {
          icon: KeyRound,
          title: "Locations et Réservations",
          link: "/profile/reservations",
        },
        {
          icon: Heart,
          title: "Favoris",
          link: "/profile/payment-methods",
        },
         {
          icon: MessageCircle,
          title: "Mes commentaires",
          link: "/profile/comments",
        },
      ]
    },
    {
      title: "Aide",
      items :[
        {
          icon: HelpCircle,
          title: "Contacter le Service Clients",
          link: '/client/help',
        },
        {
          icon: ShieldCheck,
          title: "Confidentialité et gestion des données",
          link: "/profile/security-settings",
        }
      ]
    },

  ]
  return (
    <div className="flex  text-text-light bg-background-light dark:text-text-dark dark:bg-background-dark rounded-lg">
      <main className="flex-1 p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">
          {options.map((option,index)=>(
          <Section  key={index} title={option.title} items={option.items}/>
        ))}
        </div>
      </main>
    </div>
  );
}




type SectionProps = {
  title: string;
  items:{ icon:LucideIcon, title: string, link: string}[];
};

 function Section({ title, items }: SectionProps) {
  if (!items || items.length === 0) {return <div>...</div>; }
  return (
    <div className="rounded-lg p-6 border border-gray-500 bg-background-light dark:bg-gray-800 h-full">
      <h4 className="font-bold mb-2">{title}</h4>
      <div className="text-sm">
        {items.map((item,index) => {
          const Icon = item.icon;
          return (
          <div key={index} className="hover:underline cursor-pointer my-8">
            <Link href={item.link}  className="flex items-center gap-2 justify-between">
             <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-gray-500 dark:text-gray-500" />
            {item.title}
             </div>
            <ChevronRight className="inline ml-2" size={16} />
            
            </Link>
            </div> 

        ); 
        })}
      </div>
    </div>
  )
}