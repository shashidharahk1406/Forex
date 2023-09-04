import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedAccountsRoutingModule } from './connected-accounts-routing.module';
import { ConnectedAccountsComponent } from './connected-accounts.component';



@NgModule({
  declarations: [
    ConnectedAccountsComponent
  ],
  imports: [
    CommonModule,
    ConnectedAccountsRoutingModule
  ]
})
export class ConnectedAccountsModule { }
