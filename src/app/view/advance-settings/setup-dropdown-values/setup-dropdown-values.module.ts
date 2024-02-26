import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupDropdownValuesRoutingModule } from './setup-dropdown-values-routing.module';
import { SetupDropdownValuesComponent } from './setup-dropdown-values.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    SetupDropdownValuesComponent,
  ],
  imports: [
    CommonModule,
    SetupDropdownValuesRoutingModule,
    SharedModule,
    MaterialModule,
    
  ]
})
export class SetupDropdownValuesModule { }
