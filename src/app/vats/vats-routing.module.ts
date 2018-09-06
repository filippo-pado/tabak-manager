import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VatsComponent } from '@app/vats/vats.component';
import { VatFormComponent } from '@app/vats/vat-form/vat-form.component';

const routes: Routes = [
  {
    path: '',
    component: VatsComponent,
    children: [
      {
        path: '',
        component: VatFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VatsRoutingModule { }
