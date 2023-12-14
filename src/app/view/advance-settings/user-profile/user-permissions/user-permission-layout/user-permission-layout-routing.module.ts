import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPermissionLayoutComponent } from './user-permission-layout.component';
import { AdvanceSettingsControlComponent } from './advance-settings-control/advance-settings-control.component';
import { EditAdvanceSettingsPermissionsComponent } from './edit-advance-settings-permissions/edit-advance-settings-permissions.component';
// import { UserPermissionsCardComponent } from './user-permissions-card/user-permissions-card.component';

const routes: Routes = [
  {
    path: '',
    component: UserPermissionLayoutComponent,
  },
  {
    path: 'advance-settings-controls/:id',
    component: AdvanceSettingsControlComponent,
  },
  {
    path: 'edit-advance-settings/:id',
    component: EditAdvanceSettingsPermissionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPermissionLayoutRoutingModule {}
