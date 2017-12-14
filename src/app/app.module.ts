import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppMaterialModule } from './modules/app-material.module';

import { InfoService } from './shared/info.service';
import { RidService } from './rid/rid.service';

import { NavbarComponent } from './navbar/navbar.component';
import { MovementsComponent } from './movements/movements.component';
import { RidComponent } from './rid/rid.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovementsComponent,
    RidComponent,
    PageNotFoundComponent
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
  providers: [InfoService, RidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
