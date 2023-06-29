import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Contacto } from 'src/app/interfaces/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-ver-contacto',
  templateUrl: './ver-contacto.component.html',
  styleUrls: ['./ver-contacto.component.css'],
})
export class VerContactoComponent implements OnInit /*OnDestroy*/ {
  id: number;
  contacto!: Contacto;
  loading: boolean = false;

  // contacto$!: Observable<Contacto>; --PIPE ASYNC
  // routeSub!: Subscription;
  constructor(
    private _contactoService: ContactoService,
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
    this.obtenerContacto();
  }

  /*ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }*/

  obtenerContacto() {
    this.loading = true;
    this._contactoService.getContacto(this.id).subscribe((data) => {
      this.contacto = data;
      this.loading = false;
    });
  }
}
