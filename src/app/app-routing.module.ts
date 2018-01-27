import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/core';
import { PageNotFoundComponent } from '@app/core';
import { LoginComponent } from '@app/login';

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
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/movements/category/all', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
