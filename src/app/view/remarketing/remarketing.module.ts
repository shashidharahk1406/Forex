import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemarketingRoutingModule } from './remarketing-routing.module';
import { RemarketingComponent } from './remarketing.component';



@NgModule({
  declarations: [
    RemarketingComponent
  ],
  imports: [
    CommonModule,
    RemarketingRoutingModule
  ]
})
export class RemarketingModule { }
