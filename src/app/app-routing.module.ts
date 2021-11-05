import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarComponent } from './pages/vehiculo/agregar/agregar.component';
import { EditarVehiculoComponent } from './pages/vehiculo/editar-vehiculo/editar-vehiculo.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { IndexComponent } from 'src/app/pages/index/index.component';
import { Error500Component } from 'src/app/pages/error500/error500.component';
import { UnauthorizedComponent } from 'src/app/pages/unauthorized/unauthorized.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { GuardianService } from 'src/app/_share/guardian.service';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'inicio', component: AppComponent },
  {
    path: 'departamento', component: DepartamentoComponent, canActivate: [GuardianService], children:
      [
        { path: 'ciudad/:idDep', component: CiudadComponent, canActivate: [GuardianService] }
      ]
  },
  {
    path: 'vehiculo', component: VehiculoComponent, canActivate: [GuardianService], children:
      [
        { path: 'agregar', component: AgregarComponent, canActivate: [GuardianService] },
        { path: 'editar-vehiculo/:idVehiculo', component: EditarVehiculoComponent, canActivate: [GuardianService] }
      ]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'error500', component: Error500Component },
  { path: 'usuario', component: UsuarioComponent, canActivate: [GuardianService] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }