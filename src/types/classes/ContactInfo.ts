import { Address } from './Address';

export interface ContactInfo {
  email: string;
  phone: string;
  address: Address;
  website?: string;
}

export interface ContactInfoService {
  validate(): boolean;
}
