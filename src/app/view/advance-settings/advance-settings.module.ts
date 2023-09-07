import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceSettingsRoutingModule } from './advance-settings-routing.module';
import { AdvanceSettingsComponent } from './advance-settings.component';
import { MaterialModule } from 'src/app/material.module';
import { UserprofileSettingsComponent } from './userprofile-settings/userprofile-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReplaceUserComponent } from './replace-user/replace-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DisableChatComponent } from './disable-chat/disable-chat.component';
import { UserProfileFilterComponent } from './user-profile-filter/user-profile-filter.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';




@NgModule({
  declarations: [
    AdvanceSettingsComponent,
    UserprofileSettingsComponent,
    ReplaceUserComponent,
    ResetPasswordComponent,
    DisableChatComponent,
    UserProfileFilterComponent,
    AddNewUserComponent
  ],
  imports: [
    CommonModule,
    AdvanceSettingsRoutingModule,
    MaterialModule,
    SharedModule
  ]
  
})
export class AdvanceSettingsModule { }
