import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { AppComponent } from './app.component';
import { LoginGuard } from './guards/login.guard';

// const routes: Routes = [

//   {
//     path: '',

//     redirectTo: '/',
//     pathMatch: 'full'
//   },

//   {
//     path: 'login',
//     loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
//   },

//   {
//     path: 'register',
//     loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
//   },
//   {
//     path: 'menu',
//     loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),

//   }

// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
//   exports: [RouterModule]
// })
const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('../app/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'animated-splash',
    loadChildren: () =>
      import('./animated-splash/animated-splash.module').then(
        (m) => m.AnimatedSplashPageModule
      ),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
