import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Vehiculo } from '../_model/vehiculo';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface VehicleInfo{
  content: Vehiculo[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: number;
    paged: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url = `${environment.HOST}/vehiculos`;

  constructor(private http: HttpClient) { }

  public guardar(v: Vehiculo): any{
    return this.http.post(`${this.url}/guardar`, v);
  }

  public editarVeh(v: Vehiculo): any{
    return this.http.put(`${this.url}/editar`, v);
  }

  public getVehPag(page: number, size: number): Observable<VehicleInfo>{
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));

    return this.http.get(`${this.url}/pageable/?`, {params}).pipe(
      map((vehInfo: VehicleInfo) => vehInfo),
      catchError(err => throwError(err))
    );
  }

  public getVehById(id: number): any{
    return this.http.get(`${this.url}/listar/` + id);
  }

  public asociarUser(idUsuario: number, idVehiculo: number): any{
    return this.http.post(`${this.url}/asociarcondcutor/${idUsuario}/${idVehiculo}`, null);
  }

  public desasociarUser(idUsuario: number, idVehiculo: number): any{
    return this.http.post(`${this.url}/desasociarconductor/${idUsuario}/${idVehiculo}`, null);
  }
}