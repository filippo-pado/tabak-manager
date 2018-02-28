import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MovementsRoutingModule } from './movements-routing.module';

import { MovementsComponent } from './movements.component';
import { MovementFormComponent } from './movement-form/movement-form.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';

import { MovementFormService } from './movement-form/movement-form.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MovementsRoutingModule
  ],
  declarations: [
    MovementsComponent, MovementFormComponent, CategoryPickerComponent, ConfirmDialogComponent
  ],
  providers: [
    MovementFormService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class MovementsModule { }
