import { Component, OnInit, ViewChild } from '@angular/core';
import { Departamento } from 'src/app/_model/departamento';
import { DepartamentoService } from '../../_service/departamento.service';
import { LoaderService } from '../../loader/loader.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  displayedColumns: string[] = ['idDepartamento', 'nombre', 'ciudades'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  depList: Departamento[] = [];
  dataSource = new MatTableDataSource([]);

  @ViewChild('categoryPaginator') categoryPaginator: MatPaginator;

  constructor(private departService: DepartamentoService, public loadService: LoaderService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.departService.listar().subscribe((data: any[]) => {
      data.forEach(element => {
        this.depList.push({idDepartamento: element.idDepartamento, nombre: element.nombre});
        console.log(`Código: ${element.idDepartamento} - Nombre ${element.nombre}`);
      });
      this.dataSource.data = this.depList;
      this.dataSource.paginator = this.categoryPaginator;
      this.depList = [];
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}