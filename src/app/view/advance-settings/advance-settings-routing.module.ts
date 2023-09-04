import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSettingsComponent } from './advance-settings.component';

const routes: Routes = [
  { path: '', component: AdvanceSettingsComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AdvanceSettingsRoutingModule { }
