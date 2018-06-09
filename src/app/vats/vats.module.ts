import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { VatsRoutingModule } from './vats-routing.module';

import { VatsComponent } from './vats.component';
import { VatFormComponent } from './vat-form/vat-form.component';

import { VatFormService } from './vat-form/vat-form.service';
import { VatReportComponent } from './vat-report/vat-report.component';

@NgModule({
  imports: [
    SharedModule,
    VatsRoutingModule
  ],
  declarations: [
    VatsComponent, VatFormComponent, VatReportComponent
  ],
  providers: [
    VatFormService
  ]
})
export class VatsModule { }
