import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { LeadSMSComponent } from '../lead-sms/lead-sms.component';
import { LeadCallComponent } from '../lead-call/lead-call.component';
import { MatDialog } from '@angular/material/dialog';
import { LeadWhatsappChatComponent } from '../lead-whatsapp-chat/lead-whatsapp-chat.component';

@Component({
  selector: 'app-lead-card-content',
  templateUrl: './lead-card-content.component.html',
  styleUrls: ['./lead-card-content.component.css']
})
export class LeadCardContentComponent implements OnInit {
  @Input() leadData:any;
  expandPanel=false;
  morePanel: boolean = false;
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}
  
  ngOnInit(): void {
  }
  openMorePanel(){
    this.morePanel = !this.morePanel
  }
  openSMS(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(LeadSMSComponent,config);
  }
  openCall(name:string){
    const dialogRef = this.dialog.open(LeadCallComponent, {
      width:'30%',
      data: {name:name}
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openWhatsAppChat(){
    const dialogRef = this.dialog.open(LeadWhatsappChatComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
}
