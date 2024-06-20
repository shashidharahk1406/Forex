import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileListComponent } from './user-profile-list/user-profile-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import { MaterialModule } from 'src/app/material.module';
import { TransferLeadsComponent } from './transfer-leads/transfer-leads.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileListComponent,
    DeleteUsersComponent,
    TransferLeadsComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    MaterialModule
  ],
  
})
export class UserProfileModule { }
