import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { LogsComponent } from '@app/logs/logs.component';
import { LogsRoutingModule } from '@app/logs/logs-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LogsRoutingModule
  ],
  declarations: [
    LogsComponent
  ],
  providers: []
})
export class LogsModule { }
