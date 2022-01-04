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
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./page/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./page/dashboard/todolist.module').then((m) => m.ToDoListModule),
  },
  {
    path: 'hrm',
    loadChildren: () =>
      import(
        './page/human- resource-management/human- resource-management.module'
      ).then((m) => m.HumanResourceManagementModule),
  },
  {
    path: 'setup',
    loadChildren: () =>
      import('./page/setup/setup.module').then((m) => m.SetupModule),
  },
  {
    path: 'administrator',
    loadChildren: () =>
      import('./page/Administrator/administrator.module').then(
        (m) => m.AdministratorModule
      ),
  },
  {
    path: 'warningtrans',
    loadChildren: () =>
      import('./page/warning_trans/warning_trans.module').then(
        (m) => m.WarningTransPageModule
      ),
  },

  {
    path: 'employeecategory',
    loadChildren: () =>
      import('./page/employee_category/employee_category.module').then(
        (m) => m.EmployeeCategoryPageModule
      ),
  },
  {
    path: 'status',
    loadChildren: () =>
      import('./page/status/status.module').then((m) => m.StatusPageModule),
  },
  {
    path: 'blacklist',
    loadChildren: () =>
      import('./page/blacklist/blacklist.module').then(
        (m) => m.BlacklistPageModule
      ),
  },
  {
    path: 'customerbranch',
    loadChildren: () =>
      import('./page/customer_branch/customer_branch.module').then(
        (m) => m.CustomerBranchPageModule
      ),
  },
  {
    path: 'subdistrict',
    loadChildren: () =>
      import('./page/sub_district/sub_district.module').then(
        (m) => m.SubDistrictPageModule
      ),
  },
  {
    path: 'district',
    loadChildren: () =>
      import('./page/district/district.module').then(
        (m) => m.DistrictPageModule
      ),
  },
  {
    path: 'department',
    loadChildren: () =>
      import('./page/department/department.module').then(
        (m) => m.DepartmentPageModule
      ),
  },

  {
    path: 'customertype',
    loadChildren: () =>
      import('./page/customer_type/customer_type.module').then(
        (m) => m.CustomerTypePageModule
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./page/Inventory/Inventory.module').then(
        (m) => m.InventoryModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./page/Account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'logistic',
    loadChildren: () =>
      import('./page/logistic/logistic.module').then((m) => m.LogisticModule),
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
