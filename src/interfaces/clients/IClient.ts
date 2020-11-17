import { Financial } from './IFinancial';
import { Opportunity } from './IOpportunity';
import { Sale } from './ISale';

export interface Client {
  id: number;
  name: string;
  company: string;
  situation: number;
  cellphone: string;
  phone: string;
  email: string;
  address: string;
  number: string;
  city: string;
  uf: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  credit: {
    granted: number;
    available: number;
  };
  opportunities: Opportunity[];
  financial: Financial[];
  sales: Sale[];
}
