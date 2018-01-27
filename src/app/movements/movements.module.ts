import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CategoriesModule } from '@app/categories';
import { MovementsRoutingModule } from './movements-routing.module';

import { MovementsComponent } from './movements.component';
import { MovementFormComponent } from './movement-form/movement-form.component';

import { MovementFormService } from './movement-form/movement-form.service';

@NgModule({
  imports: [
    SharedModule,
    CategoriesModule,
    MovementsRoutingModule
  ],
  declarations: [
    MovementsComponent, MovementFormComponent
  ],
  providers: [
    MovementFormService
  ]
})
export class MovementsModule { }
