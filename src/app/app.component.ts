import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

export interface PeriodicElement {
  nombre: string;
  posicion: number;
  Cedula: number;
  NumeroCelular: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, nombre: '', Cedula: 1.0079, NumeroCelular: 'H' },
  { posicion: 2, nombre: 'Helium', Cedula: 4.0026, NumeroCelular: 'He' },
  { posicion: 3, nombre: 'Lithium', Cedula: 6.941, NumeroCelular: 'Li' },
  { posicion: 4, nombre: 'Beryllium', Cedula: 9.0122, NumeroCelular: 'Be' },
  { posicion: 5, nombre: 'Boron', Cedula: 10.811, NumeroCelular: 'B' },
  { posicion: 6, nombre: 'Carbon', Cedula: 12.0107, NumeroCelular: 'C' },
  { posicion: 7, nombre: 'Nitrogen', Cedula: 14.0067, NumeroCelular: 'N' },
  { posicion: 8, nombre: 'Oxygen', Cedula: 15.9994, NumeroCelular: 'O' },
  { posicion: 9, nombre: 'Fluorine', Cedula: 18.9984, NumeroCelular: 'F' },
  { posicion: 10, nombre: 'Neon', Cedula: 20.1797, NumeroCelular: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  displayedColumns: string[] = ['posicion', 'nombre', 'Cedula', 'NumeroCelular'];
  dataSource = ELEMENT_DATA;


}