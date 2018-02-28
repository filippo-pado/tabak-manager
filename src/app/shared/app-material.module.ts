import { NgModule } from '@angular/core';
import {
  MatInputModule, MatCardModule, MatToolbarModule, MatButtonModule, MatTableModule, MatSortModule,
  MatMenuModule, MatIconModule, MatExpansionModule, MatTabsModule, MatPaginatorModule, MatProgressBarModule,
  MatSnackBarModule, MatButtonToggleModule, MatListModule, MatDialogModule
} from '@angular/material';

const modules = [
  MatInputModule, MatCardModule, MatToolbarModule, MatButtonModule, MatTableModule, MatSortModule,
  MatMenuModule, MatIconModule, MatExpansionModule, MatTabsModule, MatPaginatorModule, MatProgressBarModule,
  MatSnackBarModule, MatButtonToggleModule, MatListModule, MatDialogModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule { }
