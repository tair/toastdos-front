import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsModule } from './accounts/accounts.module';
import { SharedModule } from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from "../environments/environment";
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationService, ErrorInterceptor } from './accounts/services/authentication.service';

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

export const whitelistedDomains = [new RegExp('[\s\S]*')] as RegExp[];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: [environment.base_url.replace("http://","").replace("/api",""), '0.0.0.0:3000', '52.14.163.196:3000','3.17.185.198:3000','localhost:3000','34.208.100.59','goat.phoenixbioinformatics.org','uatgoat.phoenixbioinformatics.org']
        //whitelistedDomains: whitelistedDomains,
      }
    }),
    AccountsModule,
    NgbModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [
    AuthenticationService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
        }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
