import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimatedSplashPage } from './animated-splash.page';

const routes: Routes = [
  {
    path: '',
    component: AnimatedSplashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimatedSplashPageRoutingModule {}
