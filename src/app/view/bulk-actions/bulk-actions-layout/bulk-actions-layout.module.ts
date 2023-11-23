import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkActionsLayoutRoutingModule } from './bulk-actions-layout-routing.module';
import { BulkActionsLayoutComponent } from './bulk-actions-layout.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BulkActionsTabComponent } from './bulk-actions-tab/bulk-actions-tab.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { DataDownloadComponent } from './data-download/data-download.component';


@NgModule({
  declarations: [
    BulkActionsLayoutComponent,
    BulkActionsTabComponent,
    BulkUploadComponent,
    DataDownloadComponent
  ],
  imports: [
    CommonModule,
    BulkActionsLayoutRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports:[
      BulkActionsLayoutComponent
  ]
})
export class BulkActionsLayoutModule { }
