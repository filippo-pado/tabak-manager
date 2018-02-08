import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { LogsComponent } from './logs.component';
import { LogsRoutingModule } from './logs-routing.module';

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
