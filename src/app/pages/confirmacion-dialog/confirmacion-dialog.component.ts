import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-dialog',
  templateUrl: './confirmacion-dialog.component.html',
  styleUrls: ['./confirmacion-dialog.component.css']
})
export class ConfirmacionDialogComponent implements OnInit {

  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<ConfirmacionDialogComponent>) { }

  ngOnInit(): void {
  }

}