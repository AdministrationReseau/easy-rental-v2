import ClientNavbar from '@/components/navbar/ClientNavbar';
import Footer from '@/components/footer/footer';


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const currentUser = {
  //   name: 'John Doe',
  //   email: 'user@example.com',
  //   profilePicture: null,// '/profile.jpg', 
  //   phone: '123-456-7890',
  //   address: '123 Main St, City, Country',
  //   rewards: 1000,
  //   points: 500,
  // }
  return (
    <div className="pt-8 text-text-light dark:text-text-dark bg-background-light dark:bg-primary-900">
      <ClientNavbar/>
      
        <main className="my-12 rounded-lg">{children}</main>
      
      <Footer/>
    </div>
  );
}

