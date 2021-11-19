import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { DesasociarComponent } from '../desasociar/desasociar.component';

@Component({
  selector: 'app-conductores-asociados',
  templateUrl: './conductores-asociados.component.html',
  styleUrls: ['./conductores-asociados.component.css']
})
export class ConductoresAsociadosComponent implements OnInit {

  public condAsociados: Usuario[] = [];

  displayedColumns: string[] = ['nombre', 'apellido', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource = new MatTableDataSource([]);

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public idVehiculo: number;

  dialogRef: MatDialogRef<DesasociarComponent>;

  constructor(private user: UsuarioService, public loader: LoaderService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private VehService: VehiculoService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idVehiculo = params.idVehiculo;
      this.loadList(this.idVehiculo);
    });
  }

  private loadList(idVehiculo: number): void{
    this.user.getUserAsociado(idVehiculo).subscribe(data => {
      console.log(data);
      data.forEach(element => {
        this.condAsociados.push(element);
      });
      this.dataSource.data = this.condAsociados;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.dataSource.data = [];
    this.condAsociados = [];
  }

  public desasociarConductor(idUsuario: number): void{
    this.dialogRef = this.dialog.open(DesasociarComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.confirmMessage = 'El usuario seleccionado va a ser desasociado del vehículo';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.VehService.desasociarUser(idUsuario, Number(this.idVehiculo)).subscribe(data => {
          console.log('Usuario desasociado');
          this.loadList(this.idVehiculo);
        });
      }
      this.dialogRef = null;
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}