import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSettingsComponent } from './advance-settings.component';


const routes: Routes = [
  { path: '', component: AdvanceSettingsComponent },
  {
    path: 'communication', loadChildren: () => import('./communication/communication.module').then(m => m.CommunicationModule)},
  {
    path:'userProfileList',loadChildren:() =>import('./user-profile/user-profile.module').then(m =>m.UserProfileModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AdvanceSettingsRoutingModule { }
