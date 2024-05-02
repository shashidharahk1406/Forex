import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerLayoutRoutingModule } from './customer-layout-routing.module';
import { CustomerLayoutComponent } from './customer-layout.component';


@NgModule({
  declarations: [
    CustomerLayoutComponent
  ],
  imports: [
    CommonModule,
    CustomerLayoutRoutingModule
  ],
  
})
export class CustomerLayoutModule { }
