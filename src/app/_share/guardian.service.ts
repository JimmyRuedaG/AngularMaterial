import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../_service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class GuardianService implements CanActivate{

  userActivity: any;
  userInactive: Subject<any> = new Subject();

  stopFlag: any;

  constructor(private login: LoginService, private route: Router, private _snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
              boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('entró al guardián');

    if (this.login.isLogged() === true){

      const helper = new JwtHelperService();

      const tk = sessionStorage.getItem(environment.TOKEN);

      if (!helper.isTokenExpired(tk)){
        const decodedToken = helper.decodeToken(tk);
        const rol = decodedToken.authorities[0];
        const url = state.url;

        this.stopFlag = this.userInactive.subscribe((data) => {
          this.login.logOut();
          this.openSnackBar('Tiempo de sesión expirado');
          return false;
        });

        if (url.includes('usuario') && rol === 'Administrador'){
          return true;
        } else if (url.includes('vehiculo') && rol === 'Administrador'){
          return true;
        } else if (url.includes('departamento') && rol === 'Administrador'){
          return true;
        } else if (url.includes('conductor') && rol === 'Conductor'){
          return true;
        } else if (url.includes('pais') && rol === 'Conductor'){
          return true;
        } else {
          this.route.navigate(['/unauthoinrized']);
          return false;
        }

      }else{
        sessionStorage.clear();
        return false;
      }

    } else {
      this.route.navigate(['/unauthorized']);
      return false;
    }
  }

  openSnackBar(error: string): void {
    this._snackBar.open(error, 'Cerrar', {
      duration: 10000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  setTimeout(): void {
    if (this.login.isLogged()){
      this.userActivity = setTimeout(() => this.userInactive.next(undefined), 90000000);
    }
  }
}