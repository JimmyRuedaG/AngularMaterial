import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../app/_service/departamento.service'
import { Ciudad } from './_model/Ciudad';
import { Departamento } from './_model/Departamento';
import { LoaderService } from '../app/loader/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  displayedColumns: string[] = ['idDepartamento', 'nombre', 'ciudades'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  depList: Departamento[] = [];
  dataSource = [];

  displayedColumnsC: string[] = ['idCiudad', 'nombre'];
  columnsToDisplayC: string[] = this.displayedColumnsC.slice();
  ciudadList: Ciudad[] = [];
  dataSourceCiudad: any[] = [];

  constructor(private departamentoService: DepartamentoService,
    public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.depList = [];
    this.departamentoService.listar().subscribe(data => {
      data.forEach(element => {
        this.depList.push({ idDepartamento: element.idDepartamento, nombre: element.nombre });
        console.log(`Código: ${element.idDepartamento} - Nombre ${element.nombre}`);
      });
      this.dataSource = this.depList;
    });

  }

  cargarCiudad(idDepartamento): void {
    this.departamentoService.listarCiudades(idDepartamento).subscribe(data => {
      data.forEach(element => {
        this.ciudadList.push({ idCiudad: element.idCiudad, nombre: element.nombre });
      });
      this.dataSourceCiudad = this.ciudadList;
      console.log(this.dataSourceCiudad);
    });
    this.dataSourceCiudad = [];
    this.ciudadList = [];
  }
}
