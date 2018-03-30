import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { VatsRoutingModule } from './vats-routing.module';

import { VatsComponent } from './vats.component';
import { VatFormComponent } from './vat-form/vat-form.component';

import { VatFormService } from './vat-form/vat-form.service';

@NgModule({
  imports: [
    SharedModule,
    VatsRoutingModule
  ],
  declarations: [
    VatsComponent, VatFormComponent
  ],
  providers: [
    VatFormService
  ]
})
export class VatsModule { }
