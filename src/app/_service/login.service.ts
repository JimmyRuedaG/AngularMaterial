import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginReactivo = new Subject<boolean>();

  private url = `${environment.HOST}/oauth/token`;

  constructor(private http: HttpClient, private router: Router) { }

  public login(usuario: string, password: string): any{
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(`${this.url}`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set(
        'Authorization', 'Basic ' + btoa(`${environment.TOKEN_AUTH_USERNAME}:${environment.TOKEN_AUTH_PASSWORD}`))
    });
  }

  public logOut(): void{
    const tk = sessionStorage.getItem(environment.TOKEN);

    this.http.get(`${environment.HOST}/cerrarSesion/anular/${tk}`).subscribe(data => {
      sessionStorage.clear();
      this.router.navigate(['/']);
    });
  }

  public isLogged(): boolean{

    const tk = sessionStorage.getItem(environment.TOKEN);

    return tk != null;
  }

  public rolType(): string{
    const helper = new JwtHelperService();

    const tk = sessionStorage.getItem(environment.TOKEN);

    const decodedToken = helper.decodeToken(tk);

    return decodedToken.authorities;
  }
}