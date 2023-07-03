import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../interfaces/contacto';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Contacto/';

  constructor(private http: HttpClient) {}

  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getContacto(id: number): Observable<Contacto> {
    return this.http.get<Contacto>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteContacto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(
      `${this.myAppUrl}${this.myApiUrl}`,
      contacto
    );
  }

  updateContacto(id: number, contacto: Contacto): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      contacto
    );
  }
}

//Los servicios los utilizamos para 3 cosas, para hacer la peticion a algun backend (este es el caso)
// para reutilizacion de codigo y otra para la comunicacion de componentes.
// El observable nos devuelve un flujo de datos, en este caso un array de objetos
//El observable tiene 3 metodos, el proximo valor (next) puede recibir un error y el ultimo valor es cuando finaliza (finales)
