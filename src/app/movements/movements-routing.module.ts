import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovementsComponent } from './movements.component';
import { MovementFormComponent } from './movement-form/movement-form.component';
import { CategoryTabsComponent } from '@app/categories';

const routes: Routes = [
  {
    path: '', component: CategoryTabsComponent,
    children: [
      {
        path: 'category/:category_id',
        component: MovementsComponent,
        children: [
          { path: 'movement/:movement_id', component: MovementFormComponent },
          { path: '', component: MovementFormComponent }
        ]
      },
    ],
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

export class MovementsRoutingModule { }
