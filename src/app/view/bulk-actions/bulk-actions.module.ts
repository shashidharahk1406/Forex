import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkActionsRoutingModule } from './bulk-actions-routing.module';
import { BulkActionsComponent } from './bulk-actions.component';



@NgModule({
  declarations: [
    BulkActionsComponent
  ],
  imports: [
    CommonModule,
    BulkActionsRoutingModule
  ]
})
export class BulkActionsModule { }
