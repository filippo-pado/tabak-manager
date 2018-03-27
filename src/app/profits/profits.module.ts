import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ProfitsRoutingModule } from './profits-routing.module';
import { ChartModule } from 'angular-highcharts';

import { ProfitsComponent } from './profits.component';
import { RepartitionGraphComponent } from './repartition-graph/repartition-graph.component';
import { PeriodProfitGraphComponent } from './period-profit-graph/period-profit-graph.component';
import { PrevisionProfitGraphComponent } from './prevision-profit-graph/prevision-profit-graph.component';

@NgModule({
  imports: [
    SharedModule,
    ProfitsRoutingModule,
    ChartModule
  ],
  declarations: [
    ProfitsComponent,
    RepartitionGraphComponent,
    PeriodProfitGraphComponent,
    PrevisionProfitGraphComponent
  ],
  providers: []
})
export class ProfitsModule { }
