import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterListRoutingModule } from './filter-list-routing.module';
import { CreateFilterComponent } from './create-filter/create-filter.component';
import { FilterListComponent } from './filter-list.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SelectCounselarComponent } from './select-counselar/select-counselar.component';
import { DateFilterComponent } from './date-filter/date-filter.component';

@NgModule({
  declarations: [
    CreateFilterComponent,
    FilterListComponent,
    SelectCounselarComponent,
    DateFilterComponent
  ],
  imports: [
    CommonModule,
    FilterListRoutingModule,
    MaterialModule,
    SharedModule,
    NgxDaterangepickerMd.forRoot(),
  ]
})
export class FilterListModule {
  
 }
