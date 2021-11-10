import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculoService } from '../../_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string[] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad', 'accion'];
  dataSource = new MatTableDataSource<Vehiculo>();

  @ViewChild(MatSort) sort: MatSort;

  pageSize: number = 5;
  length: number = 10;
  pageIndex = 0;

  constructor(private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar, public route: ActivatedRoute, private barra: BarraDeProgresoService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.barra.progressBarReactiva.next(false);

    this.vehiculoService.listar(0, 5).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.barra.progressBarReactiva.next(true);
      this.length = data.totalElements;
    });
  }

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.llamarListar();

  }

  public llamarListar() {
    this.vehiculoService.listar(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}