import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Modulos
import { SharedModule } from './shared/shared.module';

// Componentes
import { AgregarEditarContactoComponent } from './pages/agregar-editar-contacto/agregar-editar-contacto.component';
import { ListadoContactoComponent } from './pages/listado-contacto/listado-contacto.component';
import { VerContactoComponent } from './pages/ver-contacto/ver-contacto.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarContactoComponent,
    ListadoContactoComponent,
    VerContactoComponent,
  ],
  imports: [BrowserModule, SharedModule, RouterModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
