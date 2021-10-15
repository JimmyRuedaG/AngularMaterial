import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../app/loader/interceptor.service';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { AgregarComponent } from './pages/vehiculo/agregar/agregar.component'
import { EditarVehiculoComponent } from './pages/vehiculo/editar-vehiculo/editar-vehiculo.component';
import { Error500Component } from './pages/error500/error500.component';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorInterceptorService } from './_share/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BuscarComponent,
    DepartamentoComponent,
    VehiculoComponent,
    CiudadComponent,
    AgregarComponent,
    EditarVehiculoComponent,
    Error500Component,
    IndexComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
