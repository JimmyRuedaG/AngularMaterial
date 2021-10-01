import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { MatSort } from '@angular/material/sort';
import { LoaderService } from 'src/app/loader/loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
})
export class DepartamentoComponent implements OnInit {
  //departamentos
  displayedColumns: string[] = ['codigo', 'nombre', 'ver'];
  dataSource = new MatTableDataSource<Departamento>();
  @ViewChild('DepartmentPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //ciudades
  displayedCityColumns: string[] = ['codigo', 'nombre'];
  dataSourceCiudad = new MatTableDataSource<Ciudad>();
  @ViewChild('cityPaginator') citiyPaginator: MatPaginator;
  @ViewChild(MatSort) citysort: MatSort;

  flagCiudad = this.dataSourceCiudad.data.length > 0 ? true : false;

  constructor(
    private departamentoService: DepartamentoService,
    public loadService: LoaderService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.departamentoService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  cargarCiudadPorDepartamento(idDepartamento: number): void {
    this.departamentoService
      .listarCiudades(idDepartamento)
      .subscribe((data) => {
        this.dataSourceCiudad = new MatTableDataSource(data);
        this.dataSourceCiudad.paginator = this.citiyPaginator;
        this.dataSourceCiudad.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceCiudad.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    } else if (this.dataSourceCiudad.paginator) {
      this.dataSourceCiudad.paginator.firstPage();
    }
  }

  cambiarEstadoFlag(): void {
    this.flagCiudad = !this.flagCiudad;
  }
}
