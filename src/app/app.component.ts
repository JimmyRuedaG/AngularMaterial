import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';

import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  public flagProgressBar: boolean = true;

  public isLogged: boolean;

  constructor(public route: ActivatedRoute, private loader: BarraDeProgresoService,
    private login: LoginService, private router: Router) {
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
  }

}

