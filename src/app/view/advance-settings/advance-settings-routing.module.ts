import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSettingsComponent } from './advance-settings.component';
import { UserprofileSettingsComponent } from './userprofile-settings/userprofile-settings.component';

const routes: Routes = [
  { path: '', component: AdvanceSettingsComponent },
  {
    path: 'communication', loadChildren: () => import('./communication/communication.module').then(m => m.CommunicationModule)
  },
  { path: 'userProfile', component: UserprofileSettingsComponent },
  // {
  //   path:'communication', loadChildren:()=> import('./communication/communication.module').then(m => m.CommunicationModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AdvanceSettingsRoutingModule { }
