import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { CategoriesComponent } from '../shared/categories/categories.component';
import { MovementsComponent } from '../movements/movements.component';
import { MovementFormComponent } from '../movements/movement-form/movement-form.component';
import { RidsComponent } from '../rids/rids.component';
import { ProfitsComponent } from '../profits/profits.component';
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'movements', component: CategoriesComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'category/:category_id',
        component: MovementsComponent,
        children: [
          {
            path: 'movement/:movement_id',
            component: MovementFormComponent,
          },
          {
            path: '',
            component: MovementFormComponent,
          }
        ]
      },

    ],
  },
  { path: 'rid', component: RidsComponent, canActivate: [AuthGuard] },
  { path: 'profit', component: ProfitsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/movements/category/all', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
