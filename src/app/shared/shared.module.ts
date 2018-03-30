import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material.module';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { UtilsService } from './utils/utils.service';

const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  FlexLayoutModule,
  AppMaterialModule
];

@NgModule({
  imports: modules,
  declarations: [ConfirmDialogComponent],
  providers: [UtilsService],
  exports: modules,
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
