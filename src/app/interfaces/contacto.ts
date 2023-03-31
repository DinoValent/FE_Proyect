export interface Contacto {
  id?: number; //se pone opcional ya que cuando estemos creando un nuevo contacto el backend nos va a proporcionar un id
  name: string;
  celularNumber: number;
  email: string;
  favorite?: boolean;
}
