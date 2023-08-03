import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-ver-contacto',
  templateUrl: './ver-contacto.component.html',
  styleUrls: ['./ver-contacto.component.css'],
})
export class VerContactoComponent implements OnInit /*OnDestroy*/ {
  id: number;
  contact!: Contact;
  loading: boolean = false;

  // contacto$!: Observable<Contacto>; --PIPE ASYNC
  // routeSub!: Subscription;
  constructor(
    private _contactoService: ContactService,
    private aRoute: ActivatedRoute
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id')); //Obtenemos el ID por ruta
  }

  ngOnInit(): void {
    //El constructor se inicia antes que el ngOnInit
    // this.contacto$ = this._contactoService.getContacto(this.id); --PIPE ASYNC
    // this.routeSub = this.aRoute.params.subscribe((data) => {
    //   this.id = data['id'];
    //   this.obtenerContacto();
    // });
    this.obtenerContact();
  }

  /*ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }*/

  obtenerContact() {
    this.loading = true;
    this._contactoService.getContact(this.id).subscribe((data) => {
      this.contact = data;
      this.loading = false;
    });
  }
}
