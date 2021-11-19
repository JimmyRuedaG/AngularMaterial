import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asociar',
  templateUrl: './asociar.component.html',
  styleUrls: ['./asociar.component.css']
})
export class AsociarComponent implements OnInit {

  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<AsociarComponent>) { }

  ngOnInit(): void {
  }

}