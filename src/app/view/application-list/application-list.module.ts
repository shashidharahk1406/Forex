import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationListRoutingModule } from './application-list-routing.module';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationListLayoutModule } from './application-list-layout/application-list-layout.module';



@NgModule({
  declarations: [
    ApplicationListComponent
  ],
  imports: [
    CommonModule,
    ApplicationListRoutingModule,
    ApplicationListLayoutModule
  ]
})
export class ApplicationListModule { }
