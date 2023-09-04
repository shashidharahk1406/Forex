import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsAppChatRoutingModule } from './whats-app-chat-routing.module';
import { WhatsAppChatComponent } from './whats-app-chat.component';



@NgModule({
  declarations: [
    WhatsAppChatComponent
  ],
  imports: [
    CommonModule,
    WhatsAppChatRoutingModule
  ]
})
export class WhatsAppChatModule { }
