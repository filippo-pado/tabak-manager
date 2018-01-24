import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/app-routing.module';
import { AppMaterialModule } from './shared/app-material.module';

import { AuthService } from './shared/auth/auth.service';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { AuthGuard } from './shared/auth/auth.guard';
import { CategoryService } from './categories/category.service';
import { CategoryFormService } from './categories/category-form/category-form.service';
import { RidService } from './rids/rid.service';
import { MovementService } from './movements/movement.service';
import { MovementFormService } from './movements/movement-form/movement-form.service';
import { ProfitService } from './profits/profit.service';
import { UtilsService } from './shared/utils/utils.service';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { CategoryTabsComponent } from './shared/category-tabs/category-tabs.component';
import { MovementsComponent } from './movements/movements.component';
import { RidsComponent } from './rids/rids.component';
import { LoginComponent } from './login/login.component';
import { MovementFormComponent } from './movements/movement-form/movement-form.component';
import { ProfitsComponent } from './profits/profits.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovementsComponent,
    RidsComponent,
    PageNotFoundComponent,
    LoginComponent,
    CategoryTabsComponent,
    CategoriesComponent,
    MovementFormComponent,
    ProfitsComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [AuthService, AuthGuard, UtilsService, CategoryService, CategoryFormService, RidService, MovementService, MovementFormService,
    ProfitService, {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
