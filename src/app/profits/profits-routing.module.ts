import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfitsComponent } from './profits.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: (new Date()).getFullYear().toString(),
    pathMatch: 'full'
  },
  {
    path: ':year', component: ProfitsComponent
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

export class ProfitsRoutingModule { }
