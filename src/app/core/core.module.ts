import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '@app/shared';

import { AuthService } from '@app/core/auth/auth.service';
import { AuthInterceptor } from '@app/core/auth/auth.interceptor';
import { AuthGuard } from '@app/core/auth/auth.guard';
import { CategoryService } from '@app/core/http/category.service';
import { MovementService } from '@app/core/http/movement.service';
import { ProfitService } from '@app/core/http/profit.service';
import { RidService } from '@app/core/http/rid.service';
import { LogService } from '@app/core/http/log.service';
import { VatService } from '@app/core/http/vat.service';
import { SlotService } from '@app/core/http/slot.service';

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
    VatService,
    SlotService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})

export class CoreModule { }
