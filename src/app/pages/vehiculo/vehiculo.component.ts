import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleInfo, VehiculoService } from '../../_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  pageEvent: PageEvent;
  displayedColumns: string[] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: VehicleInfo = null;
  vehicleList = new MatTableDataSource<Vehiculo>([]);

  public page = 0;
  public size = 3;

  showId = false;

  @ViewChild('vehiclePaginator') categoryPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private VehService: VehiculoService, public route: ActivatedRoute, public loader: LoaderService) {
  }

  ngOnInit(): void {
    this.loadVehicleInfo();
  }

  private loadVehicleInfo() {
    this.VehService.getVehPag(0, 3).pipe(
      tap(data => console.log(data)),
      map((vehInfo: VehicleInfo) => this.dataSource = vehInfo)
    ).subscribe(data => {
      this.vehicleList = new MatTableDataSource(data.content);
      this.vehicleList.sort = this.sort;
    });
  }

  public onPaginateChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.listVehicles();
  }

  public listVehicles(): void {
    this.VehService.getVehPag(this.page, this.size).pipe(
      map((vehInfo: VehicleInfo) => this.dataSource = vehInfo)
    ).subscribe(data => {
      this.vehicleList = new MatTableDataSource(data.content);
      this.vehicleList.sort = this.sort;
    });
  }

  public doFilter = (value: string) => {
    this.vehicleList.filter = value.trim().toLocaleLowerCase();
  }
}