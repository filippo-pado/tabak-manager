import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
