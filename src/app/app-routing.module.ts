import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/core';

const routes: Routes = [
  {
    path: 'movements',
    canActivate: [AuthGuard],
    loadChildren: 'app/movements/movements.module#MovementsModule'
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    loadChildren: 'app/categories/categories.module#CategoriesModule'
  },
  {
    path: 'rids',
    canActivate: [AuthGuard],
    loadChildren: 'app/rids/rids.module#RidsModule'
  },
  {
    path: 'profits',
    canActivate: [AuthGuard],
    loadChildren: 'app/profits/profits.module#ProfitsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
