import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { MatSort } from '@angular/material/sort';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})

export class DepartamentoComponent implements AfterViewInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'ver'];
  dataSource = new MatTableDataSource<Departamento>();
  @ViewChild("DepartmentPaginator") paginator: MatPaginator;
  @ViewChild("DeptoSort") Deptosort: MatSort;

  displayedCityColumns: string[] = ['codigo', 'nombre'];
  dataSourceCiudad = new MatTableDataSource<Ciudad>();
  @ViewChild("cityPaginator") citiyPaginator: MatPaginator;
  @ViewChild("CitySort") citiysort: MatSort;

  flagCiudad = this.dataSourceCiudad.data.length > 0 ? true : false;

  constructor(private departamentoService: DepartamentoService, public loadService: LoaderService) { }

  ngAfterViewInit(): void {

    this.departamentoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.Deptosort; 
    });

  }

  cargarCiudadPorDepartamento(idDepartamento: number): void {

    this.departamentoService.listarCiudades(idDepartamento).subscribe(data => {
      this.dataSourceCiudad = new MatTableDataSource(data);
      this.dataSourceCiudad.paginator = this.citiyPaginator;
      this.dataSourceCiudad.sort = this.citiysort;
      this.flagCiudad = this.dataSourceCiudad.data.length > 0 ? true : false;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceCiudad.filter=filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSourceCiudad.paginator){
      this.dataSourceCiudad.paginator.firstPage();
    }
  }
  
  // function createNewUser(id: number): UserData {
  // const  = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
  //   NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  // return {
  //   id: id.toString(),
  //   name: name,
  //   progress: Math.round(Math.random() * 100).toString(),
  //   color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  // };
  
// }

  cambiarEstadoFlag(): void {
    this.flagCiudad = !this.flagCiudad;
  }

}