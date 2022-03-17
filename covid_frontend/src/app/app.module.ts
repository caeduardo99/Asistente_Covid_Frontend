import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
;
import { HttpClientModule } from '@angular/common/http';

// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera  } from '@awesome-cordova-plugins/camera/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:
   [BrowserModule,
  IonicModule.forRoot(), 
  AppRoutingModule,
  HttpClientModule,
  IonicStorageModule.forRoot(),
  SweetAlert2Module.forRoot(),
    ],
  providers: [Camera,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}

