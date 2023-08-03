export interface Contact {
  id?: number;
  name: string;
  phone: number;
  email: string;
  isFavourite?: boolean;
  favoriteOrder?: number;
}

//entidad favoritos , numero con orden para manipularlo, llaman al mismo endpoint, baja logica/ delete
// put : actualizar el orden, post : agregar al favorito, get, delete.
