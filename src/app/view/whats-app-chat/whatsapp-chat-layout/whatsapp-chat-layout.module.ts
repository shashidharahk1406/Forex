import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsappChatLayoutRoutingModule } from './whatsapp-chat-layout-routing.module';
import { WhatsappChatLayoutComponent } from './whatsapp-chat-layout.component';
import { WhatsappChatCardComponent } from './whatsapp-chat-card/whatsapp-chat-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { WhatsappChatCardContentComponent } from './whatsapp-chat-card-content/whatsapp-chat-card-content.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { WharsappChatToolbarComponent } from './wharsapp-chat-toolbar/wharsapp-chat-toolbar.component';

import { WhatsappChatBottomPanelComponent } from './whatsapp-chat-bottom-panel/whatsapp-chat-bottom-panel.component';
import { WhatsappChatViewAllComponent } from './whatsapp-chat-view-all/whatsapp-chat-view-all.component';
import { WhatsappChatCallComponent } from './whatsapp-chat-call/whatsapp-chat-call.component';
import { WhatsappChatSmsComponent } from './whatsapp-chat-sms/whatsapp-chat-sms.component';
import { WhatsappChatEmailComponent } from './whatsapp-chat-email/whatsapp-chat-email.component';
import { WhatsappChatWhatsappComponent } from './whatsapp-chat-whatsapp/whatsapp-chat-whatsapp.component';
import { WhatsappChatEditComponent } from './whatsapp-chat-edit/whatsapp-chat-edit.component';


@NgModule({
  declarations: [
    WhatsappChatLayoutComponent,
    WhatsappChatCardComponent,
    WhatsappChatCardContentComponent,
    WharsappChatToolbarComponent,

    WhatsappChatBottomPanelComponent,
     WhatsappChatViewAllComponent,
     WhatsappChatCallComponent,
     WhatsappChatSmsComponent,
     WhatsappChatEmailComponent,
     WhatsappChatWhatsappComponent,
     WhatsappChatEditComponent,

  ],
  imports: [
    CommonModule,
    WhatsappChatLayoutRoutingModule,
    SharedModule,
    MaterialModule,
    MatBottomSheetModule,

  ],
  exports:[
    WhatsappChatLayoutComponent
  ]
})
export class WhatsappChatLayoutModule { }
