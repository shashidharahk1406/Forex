import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSettingsComponent } from './advance-settings.component';
import { UserprofileSettingsComponent } from './userprofile-settings/userprofile-settings.component';

const routes: Routes = [
  { path: '', component: AdvanceSettingsComponent},
  { path: 'userProfile',component:UserprofileSettingsComponent}
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AdvanceSettingsRoutingModule { }
