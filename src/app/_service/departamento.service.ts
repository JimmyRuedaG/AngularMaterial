import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { departamento } from '../_model/Departamento';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService{

  private url: string = `${environment.HOST} /departamento`;

  constructor(private http: HttpClient) { }
  

  public listar(){
    return this.http.get<departamento[]>(`${ this.url } /listar`);
  }
}
