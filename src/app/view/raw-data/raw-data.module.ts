import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawDataRoutingModule } from './raw-data-routing.module';
import { RawDataComponent } from './raw-data.component';
import { RawDataLayoutModule } from './raw-data-layout/raw-data-layout.module';



@NgModule({
  declarations: [
    RawDataComponent
  ],
  imports: [
    CommonModule,
    RawDataRoutingModule,
    RawDataLayoutModule
  ]
})
export class RawDataModule { }
