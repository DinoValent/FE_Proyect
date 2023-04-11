import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
];
@Component({
  selector: 'app-listado-contacto', //para renderizar los componentes tenemos que utilizar el selector
  templateUrl: './listado-contacto.component.html',
  styleUrls: ['./listado-contacto.component.css'],
})
export class ListadoContactoComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'celularNumber', 'email', 'favorite'];
  dataSource = new MatTableDataSource<Contacto>(Agenda_Contactos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'contactos por pagina';
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
