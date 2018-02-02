import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { RidsComponent } from './rids.component';
import { RidsRoutingModule } from './rids-routing.module';
import { RidUploaderComponent } from './rid-uploader/rid-uploader.component';

@NgModule({
  imports: [
    SharedModule,
    RidsRoutingModule
  ],
  declarations: [
    RidsComponent,
    RidUploaderComponent
  ],
  providers: []
})
export class RidsModule { }
