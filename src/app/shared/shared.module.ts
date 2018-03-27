import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material.module';


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
  declarations: [],
  providers: [UtilsService],
  exports: modules
})
export class SharedModule { }
