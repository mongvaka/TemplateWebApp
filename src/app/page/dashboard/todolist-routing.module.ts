import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'todolist-hr',
    loadChildren: () =>
      import('./todolist-hr/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'todolist-lead',
    loadChildren: () =>
      import('./todolist-lead/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'todolist-emp',
    loadChildren: () =>
      import('./todolist-emp/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoListRoutingModule {}
