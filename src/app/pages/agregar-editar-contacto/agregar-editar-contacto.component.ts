import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private _contactoService: ContactoService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      mail: ['', Validators.required],
      celularNumber: ['', Validators.required],
    });
  }

  agregarContacto() {
    const nombre = this.form.value.nombre;

    // Objeto armado
    const contacto: Contacto = {
      nombre: this.form.value.nombre,
      celularNumber: this.form.value.celularNumber,
      email: this.form.value.mail,
    };

    //Enviamos el contacto al Back
    this._contactoService.addContacto(contacto).subscribe((data) => {
      this.mensajeExito();
      this.router.navigate(['/listado-contacto']);
    });
  }
  mensajeExito() {
    this._snackBar.open('El contacto fue registrado con exito', '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
