import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawDataRoutingModule } from './raw-data-routing.module';
import { RawDataComponent } from './raw-data.component';



@NgModule({
  declarations: [
    RawDataComponent
  ],
  imports: [
    CommonModule,
    RawDataRoutingModule
  ]
})
export class RawDataModule { }
