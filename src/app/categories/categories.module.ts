import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CategoriesRoutingModule } from '@app/categories/categories-routing.module';

import { CategoriesComponent } from '@app/categories/categories.component';
import { CategoryFormComponent } from '@app/categories/category-form/category-form.component';

import { CategoryFormService } from '@app/categories/category-form/category-form.service';

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoriesComponent, CategoryFormComponent
  ],
  providers: [
    CategoryFormService
  ]
})
export class CategoriesModule { }
