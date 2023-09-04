import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceSettingsRoutingModule } from './advance-settings-routing.module';
import { AdvanceSettingsComponent } from './advance-settings.component';



@NgModule({
  declarations: [
    AdvanceSettingsComponent
  ],
  imports: [
    CommonModule,
    AdvanceSettingsRoutingModule
  ]
})
export class AdvanceSettingsModule { }
