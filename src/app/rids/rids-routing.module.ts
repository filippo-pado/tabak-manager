import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RidsComponent } from '@app/rids/rids.component';

const routes: Routes = [
  {
    path: '', component: RidsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class RidsRoutingModule { }
