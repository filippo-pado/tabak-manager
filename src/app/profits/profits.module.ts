import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { ProfitsComponent } from './profits.component';
import { ProfitsRoutingModule } from './profits-routing.module';
import { RepartitionGraphComponent } from './repartition-graph/repartition-graph.component';
import { PeriodProfitGraphComponent } from './period-profit-graph/period-profit-graph.component';

@NgModule({
  imports: [
    SharedModule,
    ProfitsRoutingModule
  ],
  declarations: [
    ProfitsComponent,
    RepartitionGraphComponent,
    PeriodProfitGraphComponent
  ],
  providers: []
})
export class ProfitsModule { }
