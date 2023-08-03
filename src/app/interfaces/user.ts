import { Contact } from './contact';

export interface User {
  id?: number;
  name: string;
  phone: string;
  email: string;
  contacts?: Contact[];
  password: string;
}
