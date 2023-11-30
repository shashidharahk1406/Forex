import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsLayoutModule } from './settings-layout/settings-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ShortcutMessagesModule } from './settings-layout/shortcut-messages/shortcut-messages.module';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SettingsLayoutModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule,
    ShortcutMessagesModule
  ]
})
export class SettingsModule { }
