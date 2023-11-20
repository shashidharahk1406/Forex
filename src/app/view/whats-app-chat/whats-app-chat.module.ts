import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsAppChatRoutingModule } from './whats-app-chat-routing.module';
import { WhatsAppChatComponent } from './whats-app-chat.component';
import { WhatsappChatLayoutModule } from './whatsapp-chat-layout/whatsapp-chat-layout.module';



@NgModule({
  declarations: [
    WhatsAppChatComponent
  ],
  imports: [
    CommonModule,
    WhatsAppChatRoutingModule,
    WhatsappChatLayoutModule
  ]
})
export class WhatsAppChatModule { }
