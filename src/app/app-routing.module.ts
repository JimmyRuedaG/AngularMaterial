import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: AppComponent },
  { path: 'buscar', component: BuscarComponent },
  {
    path: 'Departamento', component: DepartamentoComponent,children :[
       {path:  'ciudad:idDep', component: CiudadComponent}
    ]
  },
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
