import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListadoContactoComponent } from './pages/listado-contacto/listado-contacto.component';
import { AgregarEditarContactoComponent } from './pages/agregar-editar-contacto/agregar-editar-contacto.component';
import { VerContactoComponent } from './pages/ver-contacto/ver-contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
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
