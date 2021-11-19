import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-desasociar',
  templateUrl: './desasociar.component.html',
  styleUrls: ['./desasociar.component.css']
})
export class DesasociarComponent implements OnInit {

  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<DesasociarComponent>) { }

  ngOnInit(): void {
  }

}