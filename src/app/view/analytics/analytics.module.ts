import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { FilterListModule } from './filter-list/filter-list.module';
import { LeadCountModule } from './lead-count/lead-count.module';

@NgModule({
  declarations: [
    AnalyticsComponent,

  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    FilterListModule,
    LeadCountModule
  ]
})
export class AnalyticsModule { }
