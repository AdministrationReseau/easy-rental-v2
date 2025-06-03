export interface AgencyProps {
    id: number;
    name: string;
    description:string;
    slogan: string;
    city: string;
    quater: string;
    openingTime: string;
    closingTime: string;
    followers: number;   
    rating: number;
    type: string;
    createdAt: Date;
    updatedAt: Date; 
    images: string[];
    reviews: 
        {
          reviewer: string;
          comment: string;
          rating: number;
        }[];
    onLike?: (id: number) => void; // Fonction pour gérer les likes
    onDislike?: (id: number) => void; // Fonction pour gérer les dislikes
}

export interface FilterAgencyProps {
  city: string[];
  rating: number | null;
  status: 'open' | 'all'; // Modifié le type de 'status' pour correspondre aux valeurs possibles
  type: string[];
  followers: number[];
}


export interface AgencyListProps {
  agencies: AgencyProps[];
  filters: FilterAgencyProps;
}
