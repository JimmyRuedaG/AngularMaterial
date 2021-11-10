import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
import { VehiculoComponent } from '../vehiculo.component';
import { Vehiculo } from 'src/app/_model/vehiculo';

interface Marca {
  value: number;
  viewValue: string;
}
interface Modelo {
  value: number;
  viewValue: string;
}
interface TipoVehi {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {

  marcas: Marca[] = [
    { value: 1, viewValue: 'Toyota' },
    { value: 2, viewValue: 'Chevrolet' },
    { value: 3, viewValue: 'Renault' },
    { value: 4, viewValue: 'Mazda' },
    { value: 5, viewValue: 'Mercedes' },
    { value: 6, viewValue: 'BMW' },
    { value: 7, viewValue: 'Alfa Romero' },
    { value: 8, viewValue: 'Audi' },
    { value: 9, viewValue: 'Ferrari' },
    { value: 10, viewValue: 'Peugeot' },
    { value: 11, viewValue: 'Porche' },
  ];
  modelos: Modelo[] = [

    { value: 1, viewValue: '2007' },
    { value: 2, viewValue: '2008' },
    { value: 3, viewValue: '2009' },
    { value: 4, viewValue: '2010' },
    { value: 5, viewValue: '2011' },
    { value: 6, viewValue: '2012' },
    { value: 7, viewValue: '2013' },
    { value: 8, viewValue: '2014' },
    { value: 9, viewValue: '2015' },
    { value: 10, viewValue: '2016' },
    { value: 11, viewValue: '2017' },
    { value: 12, viewValue: '2018' },
    { value: 13, viewValue: '2019' },
    { value: 14, viewValue: '2020' },
    { value: 15, viewValue: '2021' }
  ];
  tiposV: TipoVehi[] = [
    { value: 1, viewValue: 'Carro' },
    { value: 2, viewValue: 'Camioneta' },
    { value: 3, viewValue: 'Furgon' },
    { value: 4, viewValue: 'Campero' }
  ];

  form: FormGroup;

  idVehiculo: number;
  placa: string;
  modelo: string;
  marca: string;
  tipoVehiuclo: string;
  capacidad: string;

  constructor(private formBuilder: FormBuilder, private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute,
    private barra: BarraDeProgresoService, private vehiculolista: VehiculoComponent) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.barra.progressBarReactiva.next(false);

    this.route.params.subscribe((params: Params) => {

      let value = params['idVeh']

      this.vehiculoService.listar(0, 100).subscribe(data => {
        data.content.forEach(vehiculo => {
          if (vehiculo.idVehiculo == value) {
            this.idVehiculo = value;
            this.placa = vehiculo.placa;
            this.modelo = vehiculo.modelo;
            this.marca = vehiculo.marca;
            this.tipoVehiuclo = vehiculo.tipoVehiuclo;
            this.capacidad = vehiculo.capacidad;
          }
        });
        this.barra.progressBarReactiva.next(true);
      });
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      placa: ['', [Validators.required, Validators.maxLength(7), Validators.minLength(7)]],
      modelo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      tipoVehiuclo: ['', [Validators.required]],
      capacidad: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(4)]],

    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {

      const value = this.form.value;
      let capacidad = `${value.capacidad}Kg`;

      let vehiculo: Vehiculo = new Vehiculo();
      vehiculo.idVehiculo = this.idVehiculo;
      vehiculo.placa = value.placa;
      vehiculo.modelo = value.modelo;
      vehiculo.marca = value.marca;
      vehiculo.tipoVehiuclo = value.tipoVehiuclo;
      vehiculo.capacidad = capacidad;

      this.vehiculoService.editar(vehiculo).subscribe(data => {
        this.openSnackBar("Vehiculo actualizado", "Done..");
        this.vehiculolista.llamarListar();
        this.router.navigate(['/vehiculo']);
      }, error => {
        console.log("Vehiculo no se edito " + error)
        if (error.error.status == 400) {
          this.openSnackBar("Vehiculo no...", "Error");
        }
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
}