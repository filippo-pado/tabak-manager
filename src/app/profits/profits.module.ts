import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ProfitsRoutingModule } from '@app/profits/profits-routing.module';
import { ChartModule } from 'angular-highcharts';

import { ProfitsComponent } from '@app/profits/profits.component';
import { RepartitionGraphComponent } from '@app/profits/repartition-graph/repartition-graph.component';
import { PeriodProfitGraphComponent } from '@app/profits/period-profit-graph/period-profit-graph.component';
import { PrevisionProfitGraphComponent } from '@app/profits/prevision-profit-graph/prevision-profit-graph.component';

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
