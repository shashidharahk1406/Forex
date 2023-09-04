import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BulkActionsComponent } from './bulk-actions.component';
const routes: Routes = [
  { path: '', component: BulkActionsComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class BulkActionsRoutingModule { }
