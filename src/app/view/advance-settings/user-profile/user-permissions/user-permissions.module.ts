import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPermissionsRoutingModule } from './user-permissions-routing.module';
import { UserPermissionsComponent } from './user-permissions.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    UserPermissionsComponent
  ],
  imports: [
    CommonModule,
    UserPermissionsRoutingModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class UserPermissionsModule { }
