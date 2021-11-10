import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/_service/usuario.service'
import { Usuario } from 'src/app/_model/usuario';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  rol: number = 4;
  page: number = 0;
  size: number = 5;

  displayedColumns: string[] = ['nombre', 'apellido', 'nick'];
  //, 'idTipoDocumento', 'documento', 'direccion', 'celular', 'celularAux', 'correo', 'ciudad'
  
  dataSource = new MatTableDataSource<Usuario>([]);

  constructor(private conductor: UsuarioService, public route: ActivatedRoute, public loader: LoaderService) { }

  ngOnInit(): void {
  
    this.listar();

  }

  listar(){
    this.conductor.listarConductores(this.rol, this.page, this.size).subscribe(data=>{
      console.log(data.content);
      this.dataSource = new MatTableDataSource(data.content);
    })
  }

}
