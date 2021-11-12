import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { Ciudad } from 'src/app/_model/ciudad';
import { Departamento } from 'src/app/_model/departamento';
import { Usuario } from 'src/app/_model/usuario';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { UsuarioComponent } from '../usuario.component';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public deptSelected: string;

  public citySelected: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public deptList: Departamento[] = [];
  public cityList: Ciudad[] = [];

  form: FormGroup;

  public userInfo: any;

  constructor(public loader: LoaderService, public dept: DepartamentoService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private user: UsuarioService, private updtUserList: UsuarioComponent,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.deptList = [];

    this.route.params.subscribe((params: Params) => {
      const idUsuario = params.idUsuario;
      this.loadUserInfo(idUsuario);
    });

    this.loadDept();
  }

  private loadUserInfo(idUsuario: number): void{
    this.user.getUserById(idUsuario).subscribe(data => {
      this.userInfo = data;

      console.log(this.userInfo);
    });
  }

  public editUser(event: Event): void{
    event.preventDefault();

    const user: Usuario = new Usuario();

    if (this.form.value.clave === ''){
      user.clave = this.userInfo.clave;
    }else{
      user.clave = this.form.value.clave;
    }

    user.idUsuario = this.userInfo.idUsuario;
    user.documento = this.userInfo.documento;
    user.nombre = this.form.value.nombre;
    user.apellido = this.form.value.apellido;
    user.nick = this.form.value.nick;
    user.direccion = this.form.value.direccion;
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
      this.user.editUser(user).subscribe(data => {
        this.updtUserList.listUsers();
        this.router.navigate(['/usuario']);
      });
    }else{
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void{
    this.form = this.formBuilder.group(
      {
        documento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(22)]],
        nick: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(22)]],
        direccion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
        celularAux: ['', [Validators.minLength(7), Validators.maxLength(10)]],
        correo: ['', [Validators.required, Validators.email]],
        departamento: ['', [Validators.required]],
        ciudad: ['', [Validators.required]]
      });
  }

  public loadDept(): void{
    this.dept.listar().subscribe((data: any[]) => {
      data.forEach(element => {
        this.deptList.push({idDepartamento: element.idDepartamento, nombre: element.nombre});
      });
      console.log(this.deptList);
    });
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