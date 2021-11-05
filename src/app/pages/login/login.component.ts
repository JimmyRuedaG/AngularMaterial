import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  texto: 'Login';

  form: FormGroup;



  constructor(public loadService: LoaderService, public loginService: LoginService,

    private formBuilder: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  login(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {
      this.loginService.login(this.form.value.username, this.form.value.password).subscribe(data => {


        console.log(data);

        sessionStorage.setItem(environment.TOKEN, data.access_token);

        this.router.navigate(['/']);
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }

  openSnackBarSuccess(): void {
    this._snackBar.open('Nombre de usuario o contraseña incorrecta', 'Cerrar',
      {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
  }
}