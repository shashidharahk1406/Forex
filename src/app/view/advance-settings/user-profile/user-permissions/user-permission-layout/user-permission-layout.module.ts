import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPermissionLayoutRoutingModule } from './user-permission-layout-routing.module';
import { UserPermissionLayoutComponent } from './user-permission-layout.component';
import { UserPermissionsCardComponent } from './user-permissions-card/user-permissions-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    UserPermissionLayoutComponent,
    UserPermissionsCardComponent
  ],
  imports: [
    CommonModule,
    UserPermissionLayoutRoutingModule,
    MatTabsModule,
MatCardModule

  ]
})
export class UserPermissionLayoutModule { }
