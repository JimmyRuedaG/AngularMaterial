import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleInfo, VehiculoService } from '../../_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  pageEvent: PageEvent;
  displayedColumns: string[] = ['idVehiculo', 'placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad', 'editar'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: VehicleInfo = null;
  vehiculoList = new MatTableDataSource<Vehiculo>([]);

  @ViewChild('vehiculoPaginator') categoryPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private VehiculoService: VehiculoService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadVehiculoInfo();
    this.vehiculoList.sort = this.sort;
  }

  private loadVehiculoInfo() {
    this.VehiculoService.getVehPag(0, 3).pipe(
      tap(data => console.log(data)),
      map((vehInfo: VehicleInfo) => this.dataSource = vehInfo)
    ).subscribe(data => {
      this.vehiculoList = new MatTableDataSource(data.content);
      this.vehiculoList.sort = this.sort;
    });
  }

  public onPaginateChange(event: PageEvent): void {
    let page = event.pageIndex;
    let size = event.pageSize;

    this.VehiculoService.getVehPag(page, size).pipe(
      map((vehInfo: VehicleInfo) => this.dataSource = vehInfo)
    ).subscribe(data => {
      this.vehiculoList = new MatTableDataSource(data.content);
      this.vehiculoList.sort = this.sort;
    });
  }

  public doFilter = (value: string) => {
    this.vehiculoList.filter = value.trim().toLocaleLowerCase();
  }
}