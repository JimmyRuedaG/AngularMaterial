import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    // SliderModule
  ], exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    CommonModule,
    BrowserAnimationsModule,
    // SliderModule
  ]
})
export class MaterialModuleModule { }