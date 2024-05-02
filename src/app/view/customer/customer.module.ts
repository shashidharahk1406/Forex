import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerLayoutModule } from './customer-layout/customer-layout.module';


@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerLayoutModule
  ],
  
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CustomerModule { }
