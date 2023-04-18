import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from 'src/app/interfaces/contacto';

@Component({
  selector: 'app-agregar-editar-contacto',
  templateUrl: './agregar-editar-contacto.component.html',
  styleUrls: ['./agregar-editar-contacto.component.css'],
})
export class AgregarEditarContactoComponent {
  loading: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      mail: ['', Validators.required],
      celularNumber: ['', Validators.required],
    });
  }

  agregarContacto() {
    const nombre = this.form.get('nombre')?.value;

    // Objeto armado
    const contacto: Contacto = {
      name: this.form.value.nombre,
      celularNumber: this.form.value.celularNumber,
      email: this.form.value.mail,
    };

    console.log(contacto);
  }
}
