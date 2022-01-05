import { AuthGuard } from 'app/core/services/auth.guard';
// import { dashboard } from './shared/layout/data-left-manu';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CannotAccess401Component } from './components/cannot-access401/cannot-access401.component';
import { LoginComponent } from './page/login/login.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '401',
    component: CannotAccess401Component,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'setup',
    loadChildren: () =>
      import('./page/setup/setup.module').then((m) => m.SetupModule),
  },

  // _____________________________404 page not found___________________________
  {
    path: '**',
    pathMatch: 'full',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
