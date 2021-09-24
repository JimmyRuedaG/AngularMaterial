import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../_service/departamento.service'

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})



export class BuscarComponent implements OnInit {

  //inyecciones de dependencias o librerias
  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    //Iniciar Variables
    //Llamar Metodos
    //Logica Inicial
    this.departamentoService.listar().subscribe(data => {
      data.forEach(element => {
        console.log(`codigo: ${element.idDepartamento} - Nombre ${element.nombre}`);
      });
    });
  }

}
