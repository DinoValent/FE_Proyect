import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from 'src/app/interfaces/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-agregar-editar-contacto',
  templateUrl: './agregar-editar-contacto.component.html',
  styleUrls: ['./agregar-editar-contacto.component.css'],
})
export class AgregarEditarContactoComponent {
  loading: boolean = false;
  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _contactoService: ContactoService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      mail: ['', Validators.required],
      celularNumber: ['', Validators.required],
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.obtenerContacto(this.id);
    }
  }

  obtenerContacto(id: number) {
    this._contactoService.getContacto(id).subscribe((data) => {
      this.form.setValue({
        nombre: data.nombre,
        mail: data.email,
        celularNumber: data.celularNumber,
      });
      this.loading = false;
    });
  }

  agregarEditarContacto() {
    // Objeto armado
    const contacto: Contacto = {
      nombre: this.form.value.nombre,
      celularNumber: this.form.value.celularNumber,
      email: this.form.value.mail,
    };

    if (this.id != 0) {
      contacto.id = this.id;
      this.editarContacto(this.id, contacto);
    } else {
      this.agregarContacto(contacto);
    }
  }
  editarContacto(id: number, contacto: Contacto) {
    this._contactoService.updateContacto(id, contacto).subscribe(() => {
      this.loading = false;
      this.mensajeExito('actualizado');
      this.router.navigate(['/listado-contacto']);
    });
  }

  agregarContacto(contacto: Contacto) {
    //Enviamos el contacto al Back
    this._contactoService.addContacto(contacto).subscribe((data) => {
      this.mensajeExito('registrado');
      this.router.navigate(['/listado-contacto']);
    });
  }

  mensajeExito(text: string) {
    this._snackBar.open(`El contacto fue ${text} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
