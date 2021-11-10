import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VehiculoComponent } from '../vehiculo.component';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public selectedValue: string;
  public selectedValue2: string;

  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar, private router: Router, private barra: BarraDeProgresoService,
    private vehiculoListar: VehiculoComponent) {
    this.buildForm();
  }
 
  ngOnInit(): void {
  }

  private buildForm() {
    this.barra.progressBarReactiva.next(false);
    this.form = this.formBuilder.group({
      placa: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      placanum: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      modelo: ['', [Validators.required, Validators.min(1970), Validators.max(2022)]],
      marca: ['', [Validators.required]],
      tipoVehiuclo: ['', [Validators.required]],
      capacidad: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(3)]],

    });
    this.barra.progressBarReactiva.next(true);
  }

  save(event: Event) {

    event.preventDefault();
    
    

    if (this.form.valid) {
      const value = this.form.value;

      let placa = `${value.placa}-${value.placanum}`;

      let capacidad = `${value.capacidad}Kg`;

      const v: Vehiculo = new Vehiculo();

      v.placa = placa;
      v.marca = this.selectedValue;
      v.modelo = this.form.value.modelo;
      v.tipoVehiuclo = this.selectedValue2;
      v.capacidad = capacidad;

      this.vehiculoService.guardar(v).subscribe(data => {
        this.openSnackBar("Vehiculo registrado", "cerrar");
        this.vehiculoListar.llamarListar();
        this.router.navigate(['/vehiculo']);
      }, error => {
        console.log("Vehiculo no se guardo " + error)
        if (error.error.status == 400) {
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