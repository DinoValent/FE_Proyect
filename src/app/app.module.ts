import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

//Interceptor
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';

// Modulos
import { SharedModule } from './shared/shared.module';

// Componentes
import { AgregarEditarContactoComponent } from './pages/agregar-editar-contacto/agregar-editar-contacto.component';
import { ListadoContactoComponent } from './pages/listado-contacto/listado-contacto.component';
import { VerContactoComponent } from './pages/ver-contacto/ver-contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarContactoComponent,
    ListadoContactoComponent,
    VerContactoComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
