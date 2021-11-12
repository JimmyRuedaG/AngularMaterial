import { LoaderService } from './../../../loader/loader.service';
import { BarraDeProgresoService } from './../../../_service/barra-de-progreso.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ciudad } from 'src/app/_model/ciudad';
import { Departamento } from 'src/app/_model/departamento';
import { Usuario } from 'src/app/_model/usuario';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { UsuarioComponent } from '../usuario.component';

@Component({
  selector: 'app-registrarusuario',
  templateUrl: './registrarusuario.component.html',
  styleUrls: ['./registrarusuario.component.css']
})
export class RegistrarusuarioComponent implements OnInit {

  public deptSelected: string;

  public citySelected: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public deptList: Departamento[] = [];
  public cityList: Ciudad[] = [];
  dataSource = new MatTableDataSource([]);

  @ViewChild('categoryPaginator') categoryPaginator: MatPaginator;

  form: FormGroup;

  constructor(private user: UsuarioService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar,
              private router: Router, public errorInterceptor: ErrorInterceptorService,
              public loadService: LoaderService, public dept: DepartamentoService, private User: UsuarioService,
              private updtUserList: UsuarioComponent) {
                this.buildForm();
              }

  ngOnInit(): void {
    this.deptList = [];
    this.dept.listar().subscribe((data: any[]) => {
      data.forEach(element => {
        this.deptList.push({idDepartamento: element.idDepartamento, nombre: element.nombre});
      });
      console.log(this.deptList);
      this.dataSource.data = this.deptList;
      this.dataSource.paginator = this.categoryPaginator;
    });
  }

  insertUser(event: Event): void{
    event.preventDefault();

    const user: Usuario = new Usuario();

    user.documento = this.form.value.documento;
    user.nombre = this.form.value.nombre;
    user.apellido = this.form.value.apellido;
    user.nick = this.form.value.nick;
    user.clave = this.form.value.clave;
    user.direccion = this.form.value.clave;
    user.celular = this.form.value.celular;
    user.celularAux = this.form.value.celularAux;
    user.correo = this.form.value.correo;
    user.tipoDocumento = {
      idTipoDocumento: 1
    };
    user.rol = {
      idRol: 4
    };
    user.ciudad = {
      idCiudad: Number(this.citySelected)
    };

    if (this.form.valid){
      console.log(user);

      this.User.insertUser(user).subscribe(success => {
        console.log('registrado con éxito');
        this.updtUserList.listUsers();
        this.router.navigate(['/usuario']);
      });
    }else{
      this.form.markAllAsTouched();
    }
  }

  public loadCities(value): void{
    this.cityList = [];
    console.log(value);
    this.dept.listarCiudades(value).subscribe(data => {
      data.forEach(element => {
        this.cityList.push({idCiudad: element.idCiudad, nombre: element.nombre});
      });
    });
  }

  private buildForm(): void{
    this.form = this.formBuilder.group(
      {
        documento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(22)]],
        nick: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(22)]],
        clave: ['', [Validators.required]],
        direccion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
        celularAux: ['', [Validators.minLength(7), Validators.maxLength(10)]],
        correo: ['', [Validators.required, Validators.email]],
        departamento: ['', [Validators.required]],
        ciudad: ['', [Validators.required]]
      });
  }

  public inputValidator(event: any): void {
    const pattern = /^[a-zA-Z]*$/;

    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
    }
  }

  public inputValidatorDoc(event: any): void{
    const pattern = /^[0-9]*$/;

    if (!pattern.test(event.target.value)){
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }
}