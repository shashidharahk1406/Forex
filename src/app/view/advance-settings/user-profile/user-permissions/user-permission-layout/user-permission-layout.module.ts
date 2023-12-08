import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPermissionLayoutRoutingModule } from './user-permission-layout-routing.module';
import { UserPermissionLayoutComponent } from './user-permission-layout.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AdvanceSettingsControlComponent } from './advance-settings-control/advance-settings-control.component';
import { LeadListControlComponent } from './lead-list-control/lead-list-control.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditAdvanceSettingsPermissionsComponent } from './edit-advance-settings-permissions/edit-advance-settings-permissions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
// import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { EditLeadlistPermissionsComponent } from './edit-leadlist-permissions/edit-leadlist-permissions.component';


@NgModule({
  declarations: [
    UserPermissionLayoutComponent,
    AdvanceSettingsControlComponent,
    LeadListControlComponent,
    EditAdvanceSettingsPermissionsComponent,
    EditLeadlistPermissionsComponent,
  ],
  imports: [
    CommonModule,
    UserPermissionLayoutRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    FormsModule,
    MaterialModule
  ],
})
export class UserPermissionLayoutModule {}
