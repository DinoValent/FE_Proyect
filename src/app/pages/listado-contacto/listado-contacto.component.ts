import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contacto } from 'src/app/interfaces/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-listado-contacto', //para renderizar los componentes tenemos que utilizar el selector
  templateUrl: './listado-contacto.component.html',
  styleUrls: ['./listado-contacto.component.css'],
})
export class ListadoContactoComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'nombre',
    'celularNumber',
    'email',
    'favorite',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Contacto>();
  loading: boolean = false;
  operacion: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _contactoService: ContactoService
  ) {} //aca se hace la inyeccion de dependencia

  ngOnInit(): void {
    this.obtenerContactos();
  }
  toggleFavorito(contacto: any) {
    contacto.favorito = !contacto.favorito;
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

  obtenerContactos() {
    this.loading = true;
    this._contactoService.getContactos().subscribe({
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

  eliminarContacto(id: number) {
    this.loading = true;

    this._contactoService.deleteContacto(id).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerContactos();
    });
  }

  mensajeExito() {
    this._snackBar.open('El contacto fue eliminado con exito', '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
