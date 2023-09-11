import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserprofileSettingsComponent } from './userprofile-settings/userprofile-settings.component';
import { UserProfileListComponent } from './user-profile-list.component';

const routes: Routes = [
  { path:'',component:UserProfileListComponent,children:[
    { path: 'profileSettings', component: UserprofileSettingsComponent },
    { path:'', redirectTo:'profileSettings', pathMatch:'full'},
   
  ]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileListRoutingModule { }
