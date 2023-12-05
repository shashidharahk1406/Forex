import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPermissionLayoutComponent } from './user-permission-layout.component';
import { UserPermissionsCardComponent } from './user-permissions-card/user-permissions-card.component';

const routes: Routes = [{
  path:'',component:UserPermissionLayoutComponent
},{
  path:'permissions-card',component:UserPermissionsCardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPermissionLayoutRoutingModule { }
