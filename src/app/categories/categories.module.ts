import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoriesComponent } from './categories.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryTabsComponent } from './category-tabs/category-tabs.component';

import { CategoryFormService } from './category-form/category-form.service';

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoriesComponent, CategoryFormComponent, CategoryTabsComponent
  ],
  providers: [
    CategoryFormService
  ],
  exports: [CategoryTabsComponent]
})
export class CategoriesModule { }
