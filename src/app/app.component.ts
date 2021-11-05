import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';
import { LoginService } from './_service/login.service';
import { GuardianService } from './_share/guardian.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  public flagProgressBar: boolean = true;

  public isLogged: boolean;


  constructor(public route: ActivatedRoute, private loader: BarraDeProgresoService,
    private login: LoginService, private router: Router, private guardian: GuardianService, private _snackBar: MatSnackBar) {
    this.progresValue = 0;
    this.rangeArray = new Array(100);
  }

  showFiller = false;

  progresValue: number;
  rangeArray: number[];

  title = 'AngularMaterial';

  isLoading = false;

  ngOnInit(): void {
    this.loader.progressBarReactiva.subscribe(data => {
      this.flagProgressBar = data;
    });

    this.isLogged = this.login.isLogged();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const element = document.documentElement, body = document.body, scrollTop = 'scrollTop',
      scrollHeight = 'scrollHeight';
    this.progresValue = (element[scrollTop] || body[scrollTop]) /
      ((element[scrollHeight] || body[scrollHeight]) - element.clientHeight) * 100;
  }

  loadBar(): void {
    this.isLoading = true;
    setTimeout(() => { this.isLoading = false; }, 800);
  }

  logout(): void {
    this.login.logOut();
    this.openSnackBar('Sesion cerrada');
    this.guardian.setTimeout();
  }

  @HostListener('window:mousemove') refreshUserState():void{
    clearTimeout(this.guardian.userActivity);
    this.guardian.setTimeout();
  }


  openSnackBar(error: string): void {
    this._snackBar.open(error, 'Cerrar', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
