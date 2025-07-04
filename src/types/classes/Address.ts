export interface Address {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  country: string;
}

export interface AddressService {
  getDistance(): number;
  getFullAddress(): string;
}
