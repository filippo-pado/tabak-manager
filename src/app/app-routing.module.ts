import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovementsComponent } from './movements/movements.component';
import { ItemsComponent } from './items/items.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'movements', component: MovementsComponent },
  { path: 'items', component: ItemsComponent },
  { path: '',   redirectTo: '/movements', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
