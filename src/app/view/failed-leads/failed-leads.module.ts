import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FailedLeadsRoutingModule } from './failed-leads-routing.module';
import { FailedLeadsComponent } from './failed-leads.component';
import { FailedLeadsLayoutModule } from './failed-leads-layout/failed-leads-layout.module';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';



@NgModule({
  declarations: [
    FailedLeadsComponent
  ],
  imports: [
    CommonModule,
    FailedLeadsRoutingModule,
    FailedLeadsLayoutModule,
    MaterialModule,
    SharedModule,
    MatBottomSheetModule
  ]
})
export class FailedLeadsModule { }
