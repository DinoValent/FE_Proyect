import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/User/contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.myAppUrl}${this.myApiUrl}`, contact);
  }

  updateContact(contact: Contact): Observable<void> {
    console.log(contact);
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}/${contact.id}`,
      contact
    );
  }
  moveContactUp(contactId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}/${contactId}/moveUp`,
      null,
      { headers }
    );
  }

  moveContactDown(contactId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}/${contactId}/moveDown`,
      null,
      { headers }
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } else {
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }
}

//Los servicios los utilizamos para 3 cosas, para hacer la peticion a algun backend (este es el caso)
// para reutilizacion de codigo y otra para la comunicacion de componentes.
// El observable nos devuelve un flujo de datos, en este caso un array de objetos
//El observable tiene 3 metodos, el proximo valor (next) puede recibir un error y el ultimo valor es cuando finaliza (finales)
