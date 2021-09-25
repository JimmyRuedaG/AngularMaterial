import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../app/loader/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
 
  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {
   

  }
}
