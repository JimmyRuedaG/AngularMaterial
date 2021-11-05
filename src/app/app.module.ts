import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MaterialModuleModule } from './material/material.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './loader/interceptor.service';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarComponent } from './pages/vehiculo/agregar/agregar.component';
import { EditarVehiculoComponent } from './pages/vehiculo/editar-vehiculo/editar-vehiculo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { IndexComponent } from './pages/index/index.component';
import { Error500Component } from './pages/error500/error500.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { UsuarioComponent } from './pages/usuario/usuario.component';


export function tokenGetter(): any {
  const tk = sessionStorage.getItem(environment.TOKEN);
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BuscarComponent,
    DepartamentoComponent,
    CiudadComponent,
    VehiculoComponent,
    AgregarComponent,
    EditarVehiculoComponent,
    NotFoundComponent,
    IndexComponent,
    Error500Component,
    UnauthorizedComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['159.223.107.103:8080'],
        disallowedRoutes: ['http://159.223.107.103:8080/movitapp-backend/oauth/token']
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }