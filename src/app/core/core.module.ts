import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '@app/shared';

import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';

import { CategoryService } from './http/category.service';
import { MovementService } from './http/movement.service';
import { ProfitService } from './http/profit.service';
import { RidService } from './http/rid.service';
import { LogService } from './http/log.service';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard,
    CategoryService,
    MovementService,
    ProfitService,
    RidService,
    LogService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})

export class CoreModule { }
