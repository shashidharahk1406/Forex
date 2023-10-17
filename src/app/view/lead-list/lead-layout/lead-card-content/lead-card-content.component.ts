import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { LeadSMSComponent } from '../lead-sms/lead-sms.component';
import { LeadCallComponent } from '../lead-call/lead-call.component';
import { MatDialog } from '@angular/material/dialog';
import { LeadWhatsappChatComponent } from '../lead-whatsapp-chat/lead-whatsapp-chat.component';
import { LeadEmailComponent } from '../lead-email/lead-email.component';
import { LeadVideoCallComponent } from '../lead-video-call/lead-video-call.component';
import { LeadViewAllComponent } from '../lead-view-all/lead-view-all.component';
import { LeadEditComponent } from '../lead-edit/lead-edit.component';

@Component({
  selector: 'app-lead-card-content',
  templateUrl: './lead-card-content.component.html',
  styleUrls: ['./lead-card-content.component.css']
})
export class LeadCardContentComponent implements OnInit {
  @Input()leadData:any = [];
  @Output()deleteEvent = new EventEmitter()
  
  expandPanel=false;
  morePanel: boolean = false;
  expandedCardIndex: number = -1; 
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) {}
  delete(event:any){
    this.deleteEvent.emit(event)
    // alert("ENABLED")
  }
  ngOnInit(): void {
  }
  openMorePanel(){
    this.morePanel = !this.morePanel
  }
 

  expandCard(index: number) {
    if (this.expandedCardIndex === index) {
      this.expandedCardIndex = -1;
    } else {
      this.expandedCardIndex = index;
    }
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
  openSMS(name:any): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(LeadSMSComponent,config);
  }
  openWhatsAppChat(){
    const dialogRef = this.dialog.open(LeadWhatsappChatComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openEmailChat(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(LeadEmailComponent,config);
  }
  openVideoCall(){
    const dialogRef = this.dialog.open(LeadVideoCallComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openViewAll(name:any){
    const dialogRef = this.dialog.open(LeadViewAllComponent, {
      width:'60%',
      data: {name:name}
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  editLead(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(LeadEditComponent,config);
  }
}
