import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankItemPage } from './bank-item-page/bank-item-page';
import { BankListPage } from './bank-list-page/bank-list-page';
const routes: Routes = [
  {
    path: '',
    component: BankListPage,
  },
  {
    path: ':id',
    component: BankItemPage,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingModule {}
