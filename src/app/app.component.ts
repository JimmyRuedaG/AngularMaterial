import { Component, OnInit } from '@angular/core';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
 
  constructor(private barraDeProgresoService: BarraDeProgresoService) { }

  public flagProgressBar: boolean = true;

  ngOnInit(): void {
   
    this.barraDeProgresoService.progressBarReactiva.subscribe(data =>{
      
      this.flagProgressBar = !this.flagProgressBar;
      
    })

  }
}
