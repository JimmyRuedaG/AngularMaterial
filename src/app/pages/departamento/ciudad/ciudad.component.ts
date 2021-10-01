import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

import { Ciudad } from 'src/app/_model/Ciudad';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css'],
})
export class CiudadComponent implements OnInit {
  
  //ciudades
  displayedCityColumns: string[] = ['codigo', 'nombre'];
  dataSourceCiudad = new MatTableDataSource<Ciudad>();
  @ViewChild('cityPaginator') cityPaginator: MatPaginator;
  @ViewChild(MatSort) citysort: MatSort;

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let idDepartamento = params['idDep'];

      this.departamentoService.listarCiudades(idDepartamento).subscribe((data) => {
          this.dataSourceCiudad = new MatTableDataSource(data);
          this.dataSourceCiudad.sort = this.citysort;
          this.dataSourceCiudad.paginator = this.cityPaginator;
        });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCiudad.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCiudad.paginator) {
      this.dataSourceCiudad.paginator.firstPage();
    }
  }
}