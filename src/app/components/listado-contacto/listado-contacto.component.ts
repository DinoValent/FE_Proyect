import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contacto } from 'src/app/interfaces/contacto';

const Agenda_Contactos: Contacto[] = [
  {
    name: 'Dino',
    celularNumber: 414124124,
    email: 'gamerdino41@gmail.com',
    favorite: true,
  },
  {
    name: 'Gena',
    celularNumber: 134112251,
    email: 'genacapo@gmail.com',
    favorite: true,
  },
  {
    name: 'Juan',
    celularNumber: 8445457,
    email: 'Juangamer@gmail.com',
    favorite: false,
  },
  {
    name: 'Manuel',
    celularNumber: 1234567,
    email: 'sargentomr@gmail.com',
    favorite: false,
  },
  {
    name: 'Pepito',
    celularNumber: 142125,
    email: 'affdasg',
    favorite: true,
  },
  {
    name: 'Lacha',
    celularNumber: 913459123581,
    email: 'lacha@gmail.com',
    favorite: false,
  },
  {
    name: 'Ricardo',
    celularNumber: 182484182,
    email: 'minombreesricardo@gmail.com',
    favorite: true,
  },
  {
    name: 'nash',
    celularNumber: 1294194120,
    email: 'gerovirgen@gmail.com',
    favorite: false,
  },
];
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
  dataSource = new MatTableDataSource<Contacto>(Agenda_Contactos);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'contactos por pagina';
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarContacto() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this._snackBar.open('El contacto fue eliminado con exito', '', {
        duration: 4000,
        horizontalPosition: 'right',
      });
    }, 3000);
  }
}
