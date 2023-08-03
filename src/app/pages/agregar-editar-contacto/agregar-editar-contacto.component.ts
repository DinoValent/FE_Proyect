import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

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
    private _contactService: ContactService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.getContact(this.id);
    }
  }

  getContact(id: number) {
    this._contactService.getContact(id).subscribe((data) => {
      this.form.setValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      this.loading = false;
    });
  }

  addEditContact() {
    // Objeto armado
    const contact: Contact = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      email: this.form.value.email,
    };

    if (this.id != 0) {
      contact.id = this.id;
      this.editContact(contact);
    } else {
      this.addContact(contact);
    }
  }
  editContact(contact: Contact) {
    this._contactService.updateContact(contact).subscribe(() => {
      this.loading = false;
      this.promptSuccessMessage('actualizado');
      this.router.navigate(['/listado-contacto']);
    });
  }

  addContact(contact: Contact) {
    //Enviamos el contacto al Back
    this._contactService.addContact(contact).subscribe((data) => {
      this.promptSuccessMessage('registrado');
      this.router.navigate(['/listado-contacto']);
    });
  }

  promptSuccessMessage(text: string) {
    this._snackBar.open(`El contacto fue ${text} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
