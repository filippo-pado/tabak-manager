import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { RidsComponent } from '@app/rids/rids.component';
import { RidsRoutingModule } from '@app/rids/rids-routing.module';
import { RidUploaderComponent } from '@app/rids/rid-uploader/rid-uploader.component';
import { RidVerifierComponent } from '@app/rids/rid-verifier/rid-verifier.component';

@NgModule({
  imports: [
    SharedModule,
    RidsRoutingModule
  ],
  declarations: [
    RidsComponent,
    RidUploaderComponent,
    RidVerifierComponent
  ],
  providers: []
})
export class RidsModule { }
