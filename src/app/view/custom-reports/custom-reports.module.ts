import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomReportsRoutingModule } from './custom-reports-routing.module';
import { CustomReportsComponent } from './custom-reports.component';



@NgModule({
  declarations: [
    CustomReportsComponent
  ],
  imports: [
    CommonModule,
    CustomReportsRoutingModule
  ]
})
export class CustomReportsModule { }
