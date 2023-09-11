import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileListComponent } from './user-profile-list/user-profile-list.component';


const routes: Routes = [
 
  { path: '', component: UserProfileListComponent,children:[
    {
      path:'profileList', loadChildren:()=> import('./user-profile-list/user-profile-list.module').then(m =>m.UserProfileListModule)
    },
    {
      path:'', redirectTo:'profileList', pathMatch:'full'
    }
    
  ] 
  
},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
