import ClientNavbar from '@/components/navbar/ClientNavbar';
import Image  from 'next/image';
import Footer from '@/components/footer/footer';


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = {
    name: 'John Doe',
    email: 'user@example.com',
    profilePicture: null,// '/profile.jpg', 
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    rewards: 1000,
    points: 500,
  }
  return (
    <div className="pt-8 bg-primary-700 min-h-screen text-text-primary dark:text-text-primary-dark dark:bg-primary-900">
      <ClientNavbar/>
      <div className="pt-8 px-8 lg:px-32 md:px-16 sm:px-8 flex flex-col gap-8">
          <div >
              <h1 className=" profil text-2xl text-text-dark dark:text-text-dark font-bold my-4">Profil</h1>
              <div className="flex flex-row gap-6 items-center justify-between rounded-lg mb-8">
                {currentUser.profilePicture?(
                  <Image
                  src={currentUser.profilePicture}
                  alt="Profile Picture"
                  width={10}
                  height={10}
                  className="flex-1 object-cover rounded-full mb-8 shadow-lg "
                />):
                (<div className="bg-background-green text-darkSecondary dark:text-light font-bold rounded-full w-16 h-16 flex items-center justify-center">
                    {getInitials(currentUser.name)}
                  </div>
                )}
                <div className="flex-[2] ">
                  <h2 className="text-xl text-white font-semibold mb-2">{currentUser.name}</h2>
                   <span className='flex flex-row text-text-dark'><Image src="/images/gift.png" alt="Cadeau" width={10} height={5} className="w-6 h-6 mr-2 animate-bounce" /> Vous avez {currentUser.rewards} points bonus </span>

                </div>
                
              </div>
                  {/* REWARDS BANNER */}
        {/* <div className="bg-background-light text-text-primary mt-6 rounded-lg p-4 shadow-md dark:text-text-dark dark:bg-background-dark ">
          <h2 className="text-lg font-bold mb-2">Vous disposez de {currentUser.rewards} récompenses Genius</h2>
          <p className="text-sm">Profitez de récompenses et de réductions sur certains hébergements et voitures de location dans le monde entier.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-center">
            <div className="bg-background-yellow rounded-lg px-4 py-2 text-sm">-10 % sur les hébergements</div>
            <div className="bg-background-green rounded-lg px-4 py-2 text-sm">10 % de réduction sur les voitures</div>
            <div className="bg-background-orange rounded-lg px-4 py-2 text-sm">Petit-déjeuner gratuit</div>
          </div>
        </div> */}

        {/* PROFILE COMPLETION */}
        {/* <div className="bg-white mt-6 text-text-primary p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Complétez votre profil</h3>
              <p className="text-sm">Complétez votre profil pour utiliser ces infos lors de votre prochaine réservation.</p>
            </div>
            <button className="bg-primary-500 text-white rounded-md px-4 py-2 font-semibold hover:bg-primary-600">
              Compléter
            </button>
          </div>
        </div> */}

          </div>
        <main className="my-12 rounded-lg">{children}</main>
      </div>
      <Footer/>
    </div>
  );
}

const getInitials = (name:string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };