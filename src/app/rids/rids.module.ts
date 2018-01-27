import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { RidsComponent } from './rids.component';
import { RidsRoutingModule } from './rids-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RidsRoutingModule
  ],
  declarations: [
    RidsComponent
  ],
  providers: []
})
export class RidsModule { }
