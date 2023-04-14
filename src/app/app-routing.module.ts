import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListadoContactoComponent } from './components/listado-contacto/listado-contacto.component';
import { AgregarEditarContactoComponent } from './components/agregar-editar-contacto/agregar-editar-contacto.component';
import { VerContactoComponent } from './components/ver-contacto/ver-contacto.component';

const routes: Routes = [
  { path: '', redirectTo: 'listado-contacto', pathMatch: 'full' },
  { path: 'listado-contacto', component: ListadoContactoComponent },
  {
    path: 'agregarContacto',
    component: AgregarEditarContactoComponent,
  },
  {
    path: 'ver-contacto/:id',
    component: VerContactoComponent,
  },
  {
    path: 'editarContacto/:id',
    component: AgregarEditarContactoComponent,
  },
  { path: '**', redirectTo: 'listado-contacto', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
