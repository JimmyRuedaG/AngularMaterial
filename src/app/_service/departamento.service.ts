import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../_model/Departamento';
import { Ciudad } from '../_model/Ciudad';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {
  url: string = environment.HOST + '/departamentos/';

  url2 = `${environment.HOST}/departamentos`;

  url3 = `${environment.HOST}/departamentos/ciudad/listarPorDepartamnto`;
  constructor(private http: HttpClient) { }

  public listar(): any{
    return this.http.get<Departamento[]>(`${this.url2}/listar`);
  }

  public listarCiudades(id: number): any{
    return this.http.get<Ciudad[]>(`${this.url2}/ciudad/listarPorDepartamnto/` + id);
  }
}
