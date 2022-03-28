import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimatedSplashPageRoutingModule } from './animated-splash-routing.module';

import { AnimatedSplashPage } from './animated-splash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimatedSplashPageRoutingModule
  ],
  declarations: [AnimatedSplashPage]
})
export class AnimatedSplashPageModule {}
