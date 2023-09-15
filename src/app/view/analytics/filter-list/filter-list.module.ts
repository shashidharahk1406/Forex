import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterListRoutingModule } from './filter-list-routing.module';
import { CreateFilterComponent } from './create-filter/create-filter.component';
import { FilterListComponent } from './filter-list.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CreateFilterComponent,
    FilterListComponent
  ],
  imports: [
    CommonModule,
    FilterListRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  exports:[
    FilterListComponent
  ]

})
export class FilterListModule {
  
 }
