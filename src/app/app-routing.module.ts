import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListadoContactoComponent } from './pages/listado-contacto/listado-contacto.component';
import { AgregarEditarContactoComponent } from './pages/agregar-editar-contacto/agregar-editar-contacto.component';
import { VerContactoComponent } from './pages/ver-contacto/ver-contacto.component';

const routes: Routes = [
  { path: '', redirectTo: 'listado-contacto', pathMatch: 'full' },
  {
    path: 'ver-contacto/:id',
    pathMatch: 'full',
    component: VerContactoComponent,
  },
  { path: 'listado-contacto', component: ListadoContactoComponent },
  {
    path: 'agregarContacto',
    component: AgregarEditarContactoComponent,
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
