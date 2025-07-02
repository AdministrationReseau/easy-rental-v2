export interface CarProps {
    id: string;
    agencyId: string;
    type?: string;                // Optional
    brand?: string;               // Optional
    model?: string;               // Optional
    year?: Date;                  // Optional
    rating?: number;              // Optional
    passenger?: number;           // Optional
    description: string;       // Optional
    pricePerDay: number;         // Optional
    vin?: string;        
    documents?:{
        carte_grise: string;
        visite_technique: string;
        assurance: string;
        vignette: string[];
    };
    fonctionnalities: {          // Optional
        air_condition: boolean;
        usb_input: boolean;
        seat_belt: boolean;
        audio_input: boolean;
        child_seat: boolean;
        bluetooth: boolean;
        sleeping_bed: boolean;
        onboard_computer: boolean;
        gps: boolean;
        luggage: boolean;
        water: boolean;
        additional_covers: boolean;
    };

    engine: {                    // Optional
        type?: string;
        horsepower?: number;
        capacity?: number;
    };

    transmission?: string;        // Optional
    color?: string;               // Optional
    fuel_efficiency?: {           // Optional
        city?: string;
        highway?: string;
    };

    license_plate?: string;       // Optional

    registration?: {              // Optional
        state?: string;
        expiry?: Date;
    };

    owner?: {                     // Optional
        name?: string;
        address?: string;
        phone?: string;
        email?: string;
    };

    service_history: {           // Optional
        date?: Date;
        service_type?: string;
        mileage?: number;
        provider?: string;
    }[];

    insurance?: {                 // Optional
        provider?: string;
        policy_number?: string;
        expiry?: Date;
    };

    images: string[];            // Optional

    reviews: {                   // Optional
        reviewer: string;
        comment: string;
        rating: number;
    }[];
    favorite? : boolean;
    onLike?: (id: number) => void;    // Optional
    onDislike?: (id: number) => void; // Optional
}

export interface FilterVehicleProps {
    type: string[];
    capacity: number | null;
    priceRange: [number, number];
}

export interface VehicleListProps {
    vehicles: CarProps[];
    filters: FilterVehicleProps;
}

type TypeVehicule = 'berline' | 'SUV' | 'utilitaire' | string; // Autres types possibles
type Transmission = 'manuelle' | 'automatique';
type Carburant = 'essence' | 'diesel' | 'électrique' | 'hybride';
type EtatVehicule = 'DISPONIBLE' | 'LOUÉ' | 'MAINTENANCE' | 'HORS_SERVICE' | 'RETIRÉ';

interface DocumentVehicule {
  nom: string;
  fichier: string; // URL ou chemin du fichier
  dateExpiration?: Date;
}

interface Tarification {
  heure: number;
  jour: number;
  semaine: number;
}

export interface Vehicule {
  marque: string;
  modele: string;
  annee: number;
  numeroImmatriculation: string;
  type: TypeVehicule;
  nombrePlaces: number;
  transmission: Transmission;
  carburant: Carburant;
  kilometrage: number;
  etatGeneral: string; 
  galerieImages: string[]; 
  documents: DocumentVehicule[];
  tarification: Tarification;
  agenceAppartenance: string;
  etat: EtatVehicule;
}
