import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceSettingsRoutingModule } from './advance-settings-routing.module';
import { AdvanceSettingsComponent } from './advance-settings.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdvanceSettingsComponent,
  ],
  imports: [
    CommonModule,
    AdvanceSettingsRoutingModule,
    MaterialModule,
    SharedModule
  ]
  
})
export class AdvanceSettingsModule { }
