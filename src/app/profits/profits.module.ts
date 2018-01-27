import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { ProfitsComponent } from './profits.component';
import { ProfitsRoutingModule } from './profits-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProfitsRoutingModule
  ],
  declarations: [
    ProfitsComponent
  ],
  providers: []
})
export class ProfitsModule { }
