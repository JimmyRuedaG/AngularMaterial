import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ErrorLogService, ResultJson } from 'src/app/_logueo/error-log.service';
import { BarraDeProgresoService } from '../_service/barra-de-progreso.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  resultJson: ResultJson;
  ResultJsonString: any;

  constructor(private _snackBar: MatSnackBar, private router: Router, private loader: BarraDeProgresoService,
    private errorLog: ErrorLogService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(retry(environment.REINTENTOS)).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error === true && event.body.errorMessage) {
          throw new Error(event.body.errorMessage);
        }
      }
    })).pipe(catchError((error) => {
      
      this.loader.progressBarReactiva.next(true);
      const str = error.error.message;
      const str0 = error.error.error_description;

      

      if (error.status === 400) {
        this.openSnackBar(str.slice(4, str.length));
      } else if (error.status === 401) {
        if (str === 'No estas autorizado para acceder a este recurso') {
          this.openSnackBar(str);
          this.router.navigate(['/unauthorized']);
        } else {
          this.openSnackBar(str0.slice(4, str0.length));
        }

        if (error.error.error === 'invalid_token') {
          this.openSnackBar('Token inválido');
          sessionStorage.clear();
          this.router.navigate(['/unauthorized']).then(() => { window.location.reload(); });
        }
      } else if (error.status === 404) {
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(error.error.message);
      } else if (error.error.status === 405) {
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(error.error.message);
      } else if (error.error.status === 415) {
        this.openSnackBar(str.slice(4, str.length));
        this.openSnackBar(error.error.message);
      } else if (error.error.status === 500) {
        this.router.navigate(['/error500']);
      }
      return EMPTY;
    }));
  }

  openSnackBar(error: string): void {
    this._snackBar.open(error, 'Cerrar', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    }
}