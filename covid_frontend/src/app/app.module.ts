import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AlertController, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AuthInterceptor } from './login/interceptors/logininterceptions';
import { TokenInterceptor } from './login/interceptors/tokeninterceptions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:[
  CommonModule,
  BrowserModule,
  IonicModule.forRoot(), 
  AppRoutingModule,
  HttpClientModule,
  IonicStorageModule.forRoot(),
  FormsModule,
  RouterModule,

    ],
  providers: 
  [
    
    AlertController, { provide: LOCALE_ID, useValue: "es" },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

