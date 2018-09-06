import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MovementsRoutingModule } from '@app/movements/movements-routing.module';

import { MovementsComponent } from '@app/movements/movements.component';
import { MovementFormComponent } from '@app/movements/movement-form/movement-form.component';
import { CategoryPickerComponent } from '@app/movements/category-picker/category-picker.component';

import { MovementFormService } from '@app/movements/movement-form/movement-form.service';

@NgModule({
  imports: [
    SharedModule,
    MovementsRoutingModule
  ],
  declarations: [
    MovementsComponent, MovementFormComponent, CategoryPickerComponent
  ],
  providers: [
    MovementFormService
  ]
})
export class MovementsModule { }
