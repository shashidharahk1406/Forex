import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPermissionsComponent } from './user-permissions.component';

const routes: Routes = [{
  path:'',component:UserPermissionsComponent
},
{
  path:'permissions-layout/:id',loadChildren:()=> import('./user-permission-layout/user-permission-layout.module').then(m=>m.UserPermissionLayoutModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPermissionsRoutingModule { }
