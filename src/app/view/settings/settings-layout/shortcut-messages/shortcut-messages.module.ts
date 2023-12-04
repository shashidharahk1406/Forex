import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortcutMessagesRoutingModule } from './shortcut-messages-routing.module';
import { ShortcutMessagesComponent } from './shortcut-messages.component';
import { ShortcutMessagesTableComponent } from './shortcut-messages-table/shortcut-messages-table.component';
import { MaterialModule } from 'src/app/material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddShortcutMessageComponent } from './add-shortcut-message/add-shortcut-message.component';


@NgModule({
  declarations: [
    ShortcutMessagesComponent,
    ShortcutMessagesTableComponent,
    AddShortcutMessageComponent
  ],
  imports: [
    CommonModule,
    ShortcutMessagesRoutingModule,
    MaterialModule,
    MatBottomSheetModule,
    SharedModule
  ],
  exports:[
    ShortcutMessagesComponent
  ]
})
export class ShortcutMessagesModule { }
