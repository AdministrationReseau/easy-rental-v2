// // components/AgencyDetail.tsx
// import React, { useState, useEffect } from "react";
// import { AgencyProps } from '@/types/models/agency';
// import Link from "next/link";
// import { CarProps } from "@/types/models/car";
// import { RatingStars } from "@/components/ui/ratingStars";
// import { CarCard } from "@/components/cards/CarCard";


// const AgencyImage: React.FC<{ agency: AgencyProps }> = ({ agency }) => {
//   const [currentImage, setCurrentImage] = useState(agency.images[0]);
//   if (!agency) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       {/* Galerie d'images */}
//       <div className="px-2 w-full">
//         {/* Main Image Section */}
//         <div
//           className="relative bg-cover bg-center min-h-[300px] min-w-[200px] rounded-lg shadow-lg w-full"
//           style={{ backgroundImage: `url(${currentImage})` }}
//         ></div>

//         {/* Thumbnail Images Section */}
//         <div className="flex justify-left flex-wrap mt-6 w-full gap-2 md:gap-4">
//           {agency.images.slice(0, 3).map((image, index) => (
//             <div
//               key={index}
//               className="relative bg-cover bg-center w-36 h-40 rounded-lg cursor-pointer"
//               style={{ backgroundImage: `url(${image})` }}
//               onClick={() => setCurrentImage(image)}
//             ></div>
//           ))}

//         </div>
//       </div>
//     </>
//   )
// }

// const AgencyInfo: React.FC<{ agency: AgencyProps }> = ({ agency }) => {
//   return (
//     <div className="relative bg-background-light dark:bg-background-dark rounded-lg shadow-md p-4 w-full space-y-4 ">
//     {/* Favorite Icon Placeholder */}
//     <div className="absolute top-25 text-3xl right-10 text-gray-400 hover:text-red-500 cursor-pointer">
//       ♥
//     </div>
//       <div>
//         <h3 className="text-xl font-bold text-primary-text">
//           {agency.name} {agency.type}
//         </h3>
//         <span className='flex flex-row py-4 gap-2'>
//           <RatingStars stars={agency.rating}  />
//           {agency.reviews.length} + Reviewer
//         </span>
//       </div>

//       {/* Description */}
//       <p className="text-secondary-text"><i>{agency.slogan}</i></p>
//       <p className="text-sm text-gray-500 py-2">{agency.description}</p>

//       {/* Description et Évaluation */}
//       <div className="space-y-2">
//         {/* Étoiles d'évaluation */}
//         <div className="flex justify-between">

//         </div>
//         <p className="text-gray-600">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae enim in eros elementum tristique.
//         </p>

//       </div>

//       {/* Specifications */}
//       <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 py-4">
//         <div>
//           <span className="block py-2">localisation</span>
//           <span className="block font-bold text-gray-800">{agency.city + ', ' + agency.quater}</span>
//         </div>
//         <div>
//           <span className="block py-2">Heure Ouverture</span>
//           <span className="block font-bold text-gray-800">{agency.openingTime} </span>
//         </div>

//         <div>
//           <span className="block py-2">Heure Fermeture</span>
//           <span className="block font-bold text-gray-800">{agency.closingTime}</span>
//         </div>

//       </div>
//     </div>
//   )
// }

// const AgencyVehicles: React.FC<{ agency: AgencyProps }> = ({ agency }) => {
//   const [vehicles, setVehicles] = useState<CarProps[]>([]);
//   // On doir rechercher les véhicules qui possedent en clé étrangere l'id de l'agency
//   const id_agency = agency.id;

//   // Pagination
//     const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
//     const itemsPerPage = 8; // Nombre d'éléments par page
  
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedVehicles = vehicles.slice(startIndex, endIndex);
//     const totalPages = Math.ceil(vehicles.length / itemsPerPage);
  
  
//   console.log(id_agency);
//   useEffect(() => {
//     fetch('/data/vehicles.json')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data && Array.isArray(data.vehicles)) {
//           setVehicles(data.vehicles);
//         } else {
//           console.error('Unexpected data format:', data);
//         }
//       })
//       .catch((error) => {
//         console.error('Error loading vehicles:', error);
//       });
//   }, []);

//   return (
//     <div className=" mx-auto p-5 w-full flex flex-col justify-center items-center">
//       <div className="gap-4 w-full flex justify-center flex-wrap ">
//       {paginatedVehicles.length > 0 ? (
//           paginatedVehicles.map((vehicle) => (
//             <CarCard
//             key={vehicle.id}
//             id={vehicle.id}
//             images={vehicle.images}
//             brand={vehicle.brand}
//             rating={vehicle.rating}
//             reviews={vehicle.reviews}
//             model={vehicle.model}
//             transmission={vehicle.transmission}
//             engine={vehicle.engine}
//             passenger={vehicle.passenger || 4}
//             pricePerDay={vehicle.pricePerDay}
//             type={vehicle.type}
//             year={vehicle.year}
//             description ={vehicle.description}
//             vin={vehicle.vin}
//             fonctionnalities={vehicle.fonctionnalities}
//             color={vehicle.color}
//             fuel_efficiency={vehicle.fuel_efficiency}
//             license_plate={vehicle.license_plate}
//             registration={vehicle.registration}
//             owner={vehicle.owner}
//             service_history={vehicle.service_history}
//             insurance={vehicle.insurance}
//             favorite={false}
//             onLike={function (id: number): void {console.log(id)}}
//             onDislike={function (id: number): void {console.log(id)} }
//             />))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">
//             No vehicles available matching your filters.
//           </p>
//         )}
//       </div>
//       {/* Pagination */}
//       {vehicles.length > itemsPerPage && (
//         <div className="flex justify-center items-center mt-6 space-x-4">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="text-gray-600">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }


// const AgencyDetail: React.FC<{ agency: AgencyProps }> = ({ agency }) => {

//   return (
//     <div className="relative space-y-8 bg-red w-full">
//       <Link href="/agencies">
//         <h1 className="p-4 m-4">&gt; Back to Agencies</h1>
//       </Link>
//       {/* Titre de l'agencies */}
//       <div className="flex flex-col md:flex-row gap-6 w-full rounded-lg ">
//         <div className="md:w-[60%]  px-4">
//           <AgencyImage agency={agency} />
//         </div>
//         <div className="md:w-[40%] px-4 ">
//           <AgencyInfo agency={agency} />
//         </div>
//       </div>
//       {/* Reviews Section */}
//       {/* <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
//         <h4 className="font-bold text-lg">Reviews</h4>

//         {agency.reviews.map((review: {reviewer:string, comment: string;rating: number;}, index: number) => (
//           <Reviews
//             key={index}
//             name={review.reviewer}
//             starsValue={review.rating}
//             message={review.comment}
//           />
//         ))}
//       </div> */}
//       <div className=" rounded-lg p-6">
//         <h4 className="font-bold text-lg text-center">Our Cars</h4>
//       </div>
//       <AgencyVehicles agency={agency}/>

      
//     </div>
//   );
// };

// export default AgencyDetail;


import { useState, useEffect } from "react";
import { AgencyProps } from '@/types/models/agency';
import Link from "next/link";
import { CarProps } from "@/types/models/car";
import { RatingStars } from "@/components/ui/ratingStars";
import { CarCard } from "@/components/cards/CarCard";
import Image from "next/image";
import AgencyVehiclesList from "../lists/AgencyVehiclesList";

type StaffMemberProps = {
  name: string;
  position: string;
  image: string;
};

type ReviewProps = {
  reviewer: string;
  rating: number;
  comment: string;
  // date: string;
};

const AgencyImage = ({ agency }: { agency: AgencyProps }) => {
  const [currentImage, setCurrentImage] = useState(agency.images[0]);
  if (!agency) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-2 w-full">
      <div
        className="relative bg-cover bg-center min-h-[300px] min-w-[200px] rounded-lg shadow-lg w-full"
      >
        <Image
          src={currentImage} 
          alt="photo de l'agence "
          width={300}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex justify-left flex-wrap mt-6 w-full gap-2 md:gap-4">
        {agency.images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className="relative bg-cover bg-center w-36 h-40 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setCurrentImage(image)}
          >
            <Image 
              src={image} 
              alt="autre image"
              width={96}
              height={96}
              className="object-cover w-full h-full border"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const AgencyInfo = ({ agency }: { agency: AgencyProps }) => {
  return (
    <div className="relative bg-background-light dark:bg-background-dark rounded-lg shadow-md p-6 w-full space-y-4 dark:text-text-dark">
      <div className="absolute top-6 right-6 text-3xl text-gray-400 hover:text-red-500 cursor-pointer">
        ♥
      </div>
      
      <h3 className="text-2xl font-bold text-primary-text dark:text-text-dark">
        {agency.name} {agency.type}
      </h3>
      
      <span className='flex flex-row py-2 gap-2 items-center'>
        <RatingStars stars={agency.rating} />
        <span className="text-sm text-gray-600 dark:text-text-dark">{agency.reviews.length} reviews</span>
      </span>

      <p className="text-secondary-text italic dark:text-text-dark">{agency.slogan}</p>
      
      <div className="flex items-center gap-2 text-sm">
        <span className="material-icons">location_on</span>
        <span>{agency.city}, {agency.quater}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <span className="material-icons">schedule</span>
        <span>Open {agency.openingTime} - {agency.closingTime}</span>
      </div>
    </div>
  );
};

const StaffMember = ({ name, position, image }: StaffMemberProps) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-24 h-24 rounded-full border overflow-hidden mb-2">
        <Image 
          src={image} 
          alt={name}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{position}</p>
    </div>
  );
};

const StaffSection = ({ staff }: { staff: StaffMemberProps[] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-text-dark rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Our Team</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {staff.map((member, index) => (
          <StaffMember 
            key={index}
            name={member.name}
            position={member.position}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
};

const ServicesSection = ({ services }: { services: string[] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-text-dark rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Our Services</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ReviewCard = ({ reviewer, rating, comment }: ReviewProps) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold dark:text-text-dark">{reviewer}</h4>
        <RatingStars stars={rating} />
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{comment}</p>
      <p className="text-gray-400 text-xs">JJ/MM/AAAA</p>
    </div>
  );
};

const ReviewsSection = ({ reviews }: { reviews: ReviewProps[] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl dark:text-text-dark font-bold mb-6 text-center">Customer Reviews</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.slice(0, 4).map((review, index) => (
          <ReviewCard
            key={index}
            reviewer={review.reviewer}
            rating={review.rating}
            comment={review.comment}
            // date={review.date}
          />
        ))}
      </div>
      {reviews.length > 4 && (
        <button className="mt-4 text-primary dark:text-primary-dark hover:underline">
          View all {reviews.length} reviews
        </button>
      )}
    </div>
  );
};

const AboutSection = ({ description }: { description: string }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl dark:text-text-dark font-bold mb-4 text-center">About Us</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Experience</h4>
          <p className="text-gray-600 dark:text-gray-300">10+ years in business</p>
        </div>
        <div>
          <h4 className="font-semibold">Customers</h4>
          <p className="text-gray-600 dark:text-gray-300">5000+ satisfied clients</p>
        </div>
      </div>
    </div>
  );
};

const AgencyVehicles = ({ agency }: { agency: AgencyProps }) => {
  const [vehicles, setVehicles] = useState<CarProps[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVehicles = vehicles.slice(startIndex, endIndex);
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/data/vehicles.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CarProps[] = await response.json();

        if (Array.isArray(data)) {
          const filtered = data.filter(
            (v) => v.agencyId === agency.id
          );
          setVehicles(filtered);
        } else {
          console.error("Invalid vehicles format:", data);
        }
      } catch (error) {
        console.error("Error loading vehicles:", error);
      }
    };

    fetchVehicles();
  }, [agency.id]);

  return (
    <div className="mx-auto p-5 w-full">
      <div className="gap-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedVehicles.length > 0 ? (
          paginatedVehicles.map((vehicle) => (
            <CarCard
              key={vehicle.id}
              {...vehicle}
              favorite={false}
              onLike={() => console.log(vehicle.id)}
              onDislike={() => console.log(vehicle.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No vehicles available.
          </p>
        )}
      </div>
      
      {vehicles.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 dark:text-text-dark rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600 dark:text-text-dark">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 dark:text-text-dark rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export const AgencyDetail = ({ agency }: { agency: AgencyProps }) => {
  const staffMembers = [
    { name: "John Doe", position: "Manager", image: "/assets/member.jpg" },
    { name: "Jane Smith", position: "Sales", image: "/assets/member.jpg" },
    { name: "Mike Johnson", position: "Mechanic", image: "/assets/member.jpg" },
    { name: "Sarah Williams", position: "Customer Service", image: "/assets/member.jpg" },
  ];

  const services = [
    "Car rental services",
    "24/7 road assistance",
    "Free pickup and delivery",
    "Flexible rental periods",
    "Corporate car solutions",
    "Luxury vehicle options",
    "Child seat availability",
    "GPS navigation systems"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/agencies" className="inline-flex items-center text-primary hover:underline mb-6">
        <span className="mr-2">←</span> Back to Agencies
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-2/3">
          <AgencyImage agency={agency} />
        </div>
        <div className="lg:w-1/3">
          <AgencyInfo agency={agency} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8">
        <AboutSection description={agency.description} />
        <ServicesSection services={services} />
        <StaffSection staff={staffMembers} />
        <ReviewsSection reviews={agency.reviews} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-2xl font-bold mb-6 text-center dark:text-text-dark">Our Vehicle Fleet</h3>
        <AgencyVehicles agency={agency} />

        <AgencyVehiclesList agency={agency}/>
      </div>
{/* 
      <div className="bg-primary dark:bg-primary-700 text-white rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Ready to book your perfect car?</h3>
        <p className="mb-4">Contact us today for special offers and personalized service</p>
      </div> */}
    </div>
  );
};

export default AgencyDetail;