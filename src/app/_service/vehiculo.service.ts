import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Vehiculo } from '../_model/vehiculo';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class VehiculoService {

  private url = `${environment.HOST}/vehiculos`;

  constructor(private http: HttpClient) { }

  public listar(page: number, size: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`)
  }

  public guardar(vehiculo: Vehiculo) {
    return this.http.post<any>(`${this.url}/guardar`, vehiculo)
  }

  public editar(vehiculo: Vehiculo) {
    return this.http.put<any>(`${this.url}/editar`, vehiculo)
  }
}