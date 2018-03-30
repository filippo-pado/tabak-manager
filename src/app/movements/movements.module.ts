import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MovementsRoutingModule } from './movements-routing.module';

import { MovementsComponent } from './movements.component';
import { MovementFormComponent } from './movement-form/movement-form.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';

import { MovementFormService } from './movement-form/movement-form.service';

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
