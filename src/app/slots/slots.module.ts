import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { SlotRoutingModule } from '@app/slots/slot-routing.module';

import { SlotsComponent } from '@app/slots/slots.component';
import { SlotDetailComponent } from '@app/slots/slot-detail/slot-detail.component';

import { SlotEditingService } from '@app/slots/slot-editing.service';
import { SlotListComponent } from './slot-list/slot-list.component';

@NgModule({
  imports: [
    SharedModule,
    SlotRoutingModule
  ],
  declarations: [
    SlotsComponent,
    SlotDetailComponent,
    SlotListComponent
  ],
  providers: [
    SlotEditingService
  ]
})
export class SlotsModule { }
