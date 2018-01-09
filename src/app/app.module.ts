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
import { CategoryService } from './shared/categories/category.service';
import { RidService } from './rids/rid.service';
import { MovementService } from './movements/movement.service';
import { MovementFormService } from './movements/movement-form/movement-form.service';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { CategoriesComponent } from './shared/categories/categories.component';
import { MovementsComponent } from './movements/movements.component';
import { RidsComponent } from './rids/rids.component';
import { LoginComponent } from './login/login.component';
import { MovementFormComponent } from './movements/movement-form/movement-form.component';
import { ProfitComponent } from './profit/profit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovementsComponent,
    RidsComponent,
    PageNotFoundComponent,
    LoginComponent,
    CategoriesComponent,
    MovementFormComponent,
    ProfitComponent
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
  providers: [AuthService, AuthGuard, CategoryService, RidService, MovementService, MovementFormService, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
