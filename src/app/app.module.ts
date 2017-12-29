import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { CategoryService } from './categories/category.service';
import { RidService } from './rids/rid.service';
import { MovementService } from './movements/movement.service';

import { NavbarComponent } from './navbar/navbar.component';
import { MovementsComponent } from './movements/movements.component';
import { RidsComponent } from './rids/rids.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { MovementFormComponent } from './movements/movement-form/movement-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovementsComponent,
    RidsComponent,
    PageNotFoundComponent,
    LoginComponent,
    CategoriesComponent,
    MovementFormComponent
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
  providers: [AuthService, AuthGuard, CategoryService, RidService, MovementService, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
