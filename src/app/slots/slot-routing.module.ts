import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlotsComponent } from '@app/slots/slots.component';

const routes: Routes = [
  {
    path: '',
    component: SlotsComponent,
    /*children: [
      {
        path: '',
        component: SlotFormComponent
      }
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SlotRoutingModule { }
