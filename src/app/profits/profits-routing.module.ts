import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfitsComponent } from './profits.component';
const startingYear: string = '2018';

const routes: Routes = [
  {
    path: ':year', component: ProfitsComponent
  },
  {
    path: '',
    redirectTo: startingYear,
    pathMatch: 'full'
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
