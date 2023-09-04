import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationListRoutingModule } from './application-list-routing.module';
import { ApplicationListComponent } from './application-list.component';



@NgModule({
  declarations: [
    ApplicationListComponent
  ],
  imports: [
    CommonModule,
    ApplicationListRoutingModule
  ]
})
export class ApplicationListModule { }
