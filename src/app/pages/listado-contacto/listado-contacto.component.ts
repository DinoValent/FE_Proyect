import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-listado-contacto', //para renderizar los componentes tenemos que utilizar el selector
  templateUrl: './listado-contacto.component.html',
  styleUrls: ['./listado-contacto.component.css'],
})
export class ListadoContactoComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'phone',
    'email',
    'isFavourite',
    'actions',
  ];
  dataSource = new MatTableDataSource<Contact>();
  loading: boolean = false;
  operacion: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _contactService: ContactService
  ) {} //aca se hace la inyeccion de dependencia

  ngOnInit(): void {
    this.obtenerContacts();
  }
  toggleFavourite(contact: Contact) {
    contact.isFavourite = !contact.isFavourite;

    this._contactService.updateContact(contact).subscribe({
      complete: () => {
        console.log(contact);
        // Aquí puedes agregar la lógica para actualizar la página o refrescar los datos.
      },
    });
  }

  moveContactUp(contact: Contact) {
    this._contactService.moveContactUp(contact.id as number).subscribe(() => {
      this.obtenerContacts();
    });
  }

  moveContactDown(contact: Contact) {
    this._contactService.moveContactDown(contact.id as number).subscribe(() => {
      this.obtenerContacts();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'contactos por pagina';
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Siempre que creamos un observable nos tenemos que subscribir y desuscribir
  //Pero en las peticiones Http lo hace por nosotros

  obtenerContacts() {
    this.loading = true;
    this._contactService.getContacts().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (e) => {
        this.loading = false;
        alert('Oopss ocurrio un error');
      },
      complete: () => console.info('complete'),
    });
  }

  eliminarContact(id: number) {
    this.loading = true;

    this._contactService.deleteContact(id).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerContacts();
    });
  }

  mensajeExito() {
    this._snackBar.open('El contacto fue eliminado con exito', '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
