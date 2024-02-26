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
    path:'source', loadChildren:()=> import('./setup-dropdown-values/channel-source/channel-source.module').then(m=>m.ChannelSourceModule)
  },
  {
    path:'whatsappTemplate', loadChildren:()=> import('./communication/whatsapp/whatsapp.module').then(m =>m.WhatsappModule)
  },
  {
    path:'newChannel', loadChildren:()=>import('./setup-dropdown-values/new-channel/new-channel.module').then(m=>m.NewChannelModule)
  },
  {
    path:'campaign', loadChildren:()=> import('./setup-dropdown-values/campaign/campaign.module').then(m => m.CampaignModule)
  },
  {
    path:'medium', loadChildren:() => import('./setup-dropdown-values/medium/medium.module').then(m => m.MediumModule)
  },
  {
    path:'levelOfProgram', loadChildren:()=> import('./setup-dropdown-values/level-of-program/level-of-program.module').then(m=>m.LevelOfProgramModule)
  },
  {
    path:'department', loadChildren:()=> import('./setup-dropdown-values/department/department.module').then(m => m.DepartmentModule)
  },
  {
    path:'course', loadChildren:() => import('./setup-dropdown-values/course/course.module').then(m=>m.CourseModule)
  },
  {
    path:'stream', loadChildren:() => import('./setup-dropdown-values/stream/stream.module').then(m=>m.StreamModule)
  },
  {
    path:'stages', loadChildren:() => import('./setup-dropdown-values/lead-stages/lead-stages.module').then(m=>m.LeadStagesModule)
  },
  {
    path:'countryId', loadChildren:()=> import('./setup-dropdown-values/country-id/country-id.module').then(m => m.CountryIdModule)
  },
  {
    path:'state', loadChildren:()=>import('./setup-dropdown-values/state/state.module').then(m => m.StateModule)
  },
  {
    path:'city', loadChildren:()=>import('./setup-dropdown-values/city/city.module').then(m=>m.CityModule)
  },
  {
    path:'priorityName', loadChildren:()=>import('./setup-dropdown-values/priority-name/priority-name.module').then(m =>m.PriorityNameModule)
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
