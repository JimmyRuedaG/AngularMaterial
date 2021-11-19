import { BarraDeProgresoService } from './../_service/barra-de-progreso.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ErrorLogService, ResultJson } from 'src/app/_logueo/error-log.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

 
  resultJson: ResultJson;
  ResultJsonString: any;

  constructor(private _snackBar: MatSnackBar, private router: Router, private loader: BarraDeProgresoService,
              private errorLog: ErrorLogService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Entró al interceptor');

    return next.handle(req).pipe(retry(environment.REINTENTOS)).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error === true && event.body.errorMessage){
          throw new Error(event.body.errorMessage);
        }
      }
    })).pipe(catchError((error) => {

      console.log(error);
      this.loader.progressBarReactiva.next(true);
      const str = error.error.message;
      const str0 = error.error.error_description;

      if (error.error.status === 400){
        this.openSnackBar(str.slice(4, str.length));
      } else if (error.status === 401){
        if (str === 'No estas autorizado para acceder a este recurso')
        {
          this.openSnackBar(str);
          this.router.navigate(['/login']);
        } else {
          this.openSnackBar('Nick o contraseña inválido');
        }

        if (error.error.error === 'invalid_token'){
          sessionStorage.clear();
          this.router.navigate(['/login']);
          this.openSnackBar('Token inválido');
        }
      }else if (error.status === 404) {
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(error.error.message);
      } else if (error.error.status === 405){
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(error.error.message);
      } else if (error.error.status === 415) {
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(error.error.message);
      } else if (error.error.status === 500) {
        this.router.navigate(['/error500']);
      } else if (error.status === 400){
        if (str0 === 'Bad credentials'){
          this.openSnackBar('Contraseña incorrecta');
        }
      }
      return EMPTY;
    }));
  }

  openSnackBar(error: string): void {
    this._snackBar.open(error, 'Cerrar', {
      duration: 10000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

}