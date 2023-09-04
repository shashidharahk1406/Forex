import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConnectedAccountsComponent } from './connected-accounts.component';
const routes: Routes = [
  { path: '', component: ConnectedAccountsComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ConnectedAccountsRoutingModule { }
