import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSettingsComponent } from './advance-settings.component';


const routes: Routes = [
  { path: '', component: AdvanceSettingsComponent , children:[
    {
      path:'setupDropDownValues', loadChildren:()=>import('./setup-dropdown-values/setup-dropdown-values.module').then(m=>m.SetupDropdownValuesModule)
    },
    {
      path: 'communication', loadChildren: () => import('./communication/communication.module').then(m => m.CommunicationModule)},
  ]
}, 

  {
    path:'userProfileList',loadChildren:() =>import('./user-profile/user-profile.module').then(m =>m.UserProfileModule)
  },
  {
    path:"status", loadChildren:()=> import('./setup-dropdown-values/status/status.module').then(m=>m.StatusModule)
  },
  {
    path:'subStatus', loadChildren:()=>import('./setup-dropdown-values/sub-status/sub-status.module').then(m =>m.SubStatusModule)
  },
  {
    path:'channel', loadChildren:()=>import('./setup-dropdown-values/channel/channel.module').then(m=>m.ChannelModule)
  },
  {
    path:'whatsappTemplate', loadChildren:()=> import('./communication/whatsapp/whatsapp.module').then(m =>m.WhatsappModule)
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
