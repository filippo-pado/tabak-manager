import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { MovementsComponent } from '../movements/movements.component';
import { RidsComponent } from '../rids/rids.component';
import { ProfitComponent } from '../profit/profit.component';
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'movements', component: MovementsComponent, canActivate: [AuthGuard] },
  { path: 'rid', component: RidsComponent, canActivate: [AuthGuard] },
  { path: 'profit', component: ProfitComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/movements', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
