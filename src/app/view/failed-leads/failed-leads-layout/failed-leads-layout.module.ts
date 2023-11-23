import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailedLeadsLayoutRoutingModule } from './failed-leads-layout-routing.module';
import { FailedLeadsLayoutComponent } from './failed-leads-layout.component';
import { FailedLeadsTableComponent } from './failed-leads-table/failed-leads-table.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FailedLeadsUploadComponent } from './failed-leads-upload/failed-leads-upload.component';


@NgModule({
  declarations: [
    FailedLeadsLayoutComponent,
    FailedLeadsTableComponent,
    FailedLeadsUploadComponent
  ],
  imports: [
    CommonModule,
    FailedLeadsLayoutRoutingModule,
    MaterialModule,
    SharedModule,
    MatBottomSheetModule
  ],
  exports:[
    FailedLeadsLayoutComponent
  ]
})
export class FailedLeadsLayoutModule { }
