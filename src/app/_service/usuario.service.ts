import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.HOST}/usuarios/pageablePorRol`;
  
  constructor(private http: HttpClient) { }

  public listarConductores(rol:number, page:number, size:number){
    return this.http.get<any>(`${this.url}/${rol}/${page}/${size}`)
  }
}
