import { Component, OnInit,Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { WhatsappChatViewAllComponent } from '../whatsapp-chat-view-all/whatsapp-chat-view-all.component';
import { WhatsappChatCallComponent } from '../whatsapp-chat-call/whatsapp-chat-call.component';
import { WhatsappChatSmsComponent } from '../whatsapp-chat-sms/whatsapp-chat-sms.component';
import { WhatsappChatEmailComponent } from '../whatsapp-chat-email/whatsapp-chat-email.component';
import { WhatsappChatWhatsappComponent } from '../whatsapp-chat-whatsapp/whatsapp-chat-whatsapp.component';
import { WhatsappChatEditComponent } from '../whatsapp-chat-edit/whatsapp-chat-edit.component';

@Component({
  selector: 'app-whatsapp-chat-card-content',
  templateUrl: './whatsapp-chat-card-content.component.html',
  styleUrls: ['./whatsapp-chat-card-content.component.css']
})
export class WhatsappChatCardContentComponent implements OnInit {

  @Input()leadData:any;
  expandPanel=false;
  morePanel: boolean = false;
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}
  
  ngOnInit(): void {
  }
  openMorePanel(){
    this.morePanel = !this.morePanel
  }
  
  openCall(name:string){
    const dialogRef = this.dialog.open(WhatsappChatCallComponent, {
      width:'30%',
      data: {name:name}
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  openSMS(name:any): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(WhatsappChatSmsComponent,config);
  }
  openWhatsAppChat(){
    const dialogRef = this.dialog.open(WhatsappChatWhatsappComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }
  openEmailChat(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(WhatsappChatEmailComponent,config);
  }
  openVideoCall(){
    // const dialogRef = this.dialog.open(RawDataVideoCallComponent, {
    //   width:'45%',
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   //console.log('The dialog was closed');
    // });
  }
  openViewAll(name:any){
    const dialogRef = this.dialog.open(WhatsappChatViewAllComponent, {
      width:'60%',
      data: {name:name}
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }
  editLead(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(WhatsappChatEditComponent,config);
  }

  
  }
  
