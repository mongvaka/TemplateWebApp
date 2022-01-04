import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'car',
  //   loadChildren: () =>
  //     import('./car/car-routing.module').then((m) => m.CarRoutingModule),
  // },
  // {
  //   path: 'job',
  //   loadChildren: () => import('./job/job.module').then((m) => m.JobPageModule),
  // },
  {
    path: 'car',
    loadChildren: () => import('./car/car.module').then((m) => m.CarPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticRoutingModule {}
