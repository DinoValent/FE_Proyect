import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Modulos
import { SharedModule } from './shared/shared.module';

// Componentes
import { AgregarEditarContactoComponent } from './components/agregar-editar-contacto/agregar-editar-contacto.component';
import { ListadoContactoComponent } from './components/listado-contacto/listado-contacto.component';
import { VerContactoComponent } from './components/ver-contacto/ver-contacto.component';
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
