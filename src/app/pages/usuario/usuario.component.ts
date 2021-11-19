import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService, UserInfo } from 'src/app/_service/usuario.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from '../confirmacion-dialog/confirmacion-dialog.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  pageEvent: PageEvent;
  displayedColumns: string[] = ['idUsuario', 'nombre', 'apellido', 'nick', 'documento', 'correo', 'rol', 'ciudad', 'ciudad2', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource: UserInfo;
  userList = new MatTableDataSource<Usuario>([]);

  public page = 0;
  public size = 3;

  @ViewChild('userPaginator') userPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dialogRef: MatDialogRef<ConfirmacionDialogComponent>;

  constructor(public loader: LoaderService, public route: ActivatedRoute, private userServ: UsuarioService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUserInfo(this.page, this.size);
  }

  private loadUserInfo(page: number, size: number): void{
    this.userServ.getUsers(page, size).pipe(
      tap(data => console.log(data)),
      map((uInfo: UserInfo) => this.dataSource = uInfo)
    ).subscribe(data => {
      this.userList = new MatTableDataSource(data.content);
      this.userList.sort = this.sort;
    });
  }

  public deleteUser(idUsuario: number): void{
    console.log(idUsuario);

    this.dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.confirmMessage = 'El usuario seleccionado va a ser eliminado';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userServ.deleteUser(idUsuario).subscribe(data => {
          console.log('Usuario eliminado');
          this.loadUserInfo(this.page, this.size);
        });
      }

      this.dialogRef = null;
    });

  }

  public onPaginateChange(event: PageEvent): void{
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.listUsers();
  }

  public listUsers(): void{
    this.userServ.getUsers(this.page, this.size).pipe(
      map((uInfo: UserInfo) => this.dataSource = uInfo)
    ).subscribe(data => {
      this.userList = new MatTableDataSource(data.content);
      this.userList.sort = this.sort;
    });
  }

  public doFilter = (value: string) => {
    this.userList.filter = value.trim().toLocaleLowerCase();
  }
}