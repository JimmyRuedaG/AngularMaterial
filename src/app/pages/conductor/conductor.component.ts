import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  constructor() { }

  public imageObject: Array<object> = [
    {
      image: 'assets/pueblito.jpg',
      thumbImage: 'assets/pueblito.jpg',
      alt: 'AE86',
      title: 'pueblito'
    }
  ];

  ngOnInit(): void {
  }

}