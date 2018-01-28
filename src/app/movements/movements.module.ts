import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MovementsRoutingModule } from './movements-routing.module';

import { MovementsComponent } from './movements.component';
import { MovementFormComponent } from './movement-form/movement-form.component';
import { CategoryTabsComponent } from './category-tabs/category-tabs.component';

import { MovementFormService } from './movement-form/movement-form.service';

@NgModule({
  imports: [
    SharedModule,
    MovementsRoutingModule
  ],
  declarations: [
    MovementsComponent, MovementFormComponent, CategoryTabsComponent
  ],
  providers: [
    MovementFormService
  ]
})
export class MovementsModule { }
