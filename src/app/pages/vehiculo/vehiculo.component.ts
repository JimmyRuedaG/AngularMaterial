import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  displayedColumns: string[] = ['idVehiculo', 'placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad'];
  dataSource = new MatTableDataSource<Vehiculo>();

  constructor(private vehiculoService: VehiculoService,
              public loadService: LoaderService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.vehiculoService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

}