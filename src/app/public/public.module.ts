import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { PublicRoutingModule } from '@app/public/public-routing.module';
import { LoginComponent } from '@app/public/login/login.component';
import { NavbarComponent } from '@app/public/navbar/navbar.component';
import { PageNotFoundComponent } from '@app/public/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    SharedModule,
    PublicRoutingModule
  ],
  declarations: [
    LoginComponent,
    NavbarComponent,
    PageNotFoundComponent
  ],
  providers: [],
  exports: [NavbarComponent]
})
export class PublicModule { }
