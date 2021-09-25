import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from 'src/app/loader/loader.service';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})

export class DepartamentoComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'ver'];
  displayedCityColumns: string[] = ['codigo', 'nombre'];
  dataSource = new MatTableDataSource<Departamento>();
  dataSourceCiudad = new MatTableDataSource<Ciudad>();

  @ViewChild("DepartmentPaginator") paginator: MatPaginator;
  @ViewChild("cityPaginator") citiyPaginator: MatPaginator;

  flagCiudad = this.dataSourceCiudad.data.length > 0 ? true : false;

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {

    this.departamentoService.listar().subscribe(data => {

      /*data.forEach(element => {
          console.log(`Codigo: ${element.idDepartamento} - Nombre ${element.nombre}`);
      });*/
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

  }

  cargarCiudadPorDepartamento(idDepartamento: number): void {

    this.departamentoService.listarCiudades(idDepartamento).subscribe(data => {
      this.dataSourceCiudad = new MatTableDataSource(data);
      this.dataSourceCiudad.paginator = this.citiyPaginator;
      this.flagCiudad = this.dataSourceCiudad.data.length > 0 ? true : false;

    });
  }

  cambiarEstadoFlag(): void {
    this.flagCiudad = !this.flagCiudad;
  }

}