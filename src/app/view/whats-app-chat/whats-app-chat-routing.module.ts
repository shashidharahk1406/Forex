import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WhatsAppChatComponent } from './whats-app-chat.component';

const routes: Routes = [
  { path: '', component: WhatsAppChatComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class WhatsAppChatRoutingModule { }
