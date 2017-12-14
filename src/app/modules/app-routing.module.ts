import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovementsComponent } from '../movements/movements.component';
import { RidComponent } from '../rid/rid.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'movements', component: MovementsComponent },
  { path: 'rid', component: RidComponent },
  { path: '', redirectTo: '/movements', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
