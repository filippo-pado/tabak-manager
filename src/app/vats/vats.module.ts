import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { VatsRoutingModule } from '@app/vats/vats-routing.module';

import { VatsComponent } from '@app/vats/vats.component';
import { VatFormComponent } from '@app/vats/vat-form/vat-form.component';

import { VatFormService } from '@app/vats/vat-form/vat-form.service';
import { VatReportComponent } from '@app/vats/vat-report/vat-report.component';

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
