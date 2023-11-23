import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkActionsRoutingModule } from './bulk-actions-routing.module';
import { BulkActionsComponent } from './bulk-actions.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BulkActionsLayoutModule } from './bulk-actions-layout/bulk-actions-layout.module';



@NgModule({
  declarations: [
    BulkActionsComponent,
  ],
  imports: [
    CommonModule,
    BulkActionsRoutingModule,
    MaterialModule,
    SharedModule,
    BulkActionsLayoutModule
  ]
})
export class BulkActionsModule { }
