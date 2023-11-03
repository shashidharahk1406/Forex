import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { LeadVideoCallComponent } from '../lead-video-call/lead-video-call.component';
import { LeadSMSComponent } from '../lead-sms/lead-sms.component';
import { LeadWhatsappChatComponent } from '../lead-whatsapp-chat/lead-whatsapp-chat.component';
import { LeadEmailComponent } from '../lead-email/lead-email.component';
import { ReferLeadComponent } from '../refer-lead/refer-lead.component';
import { LeadFilterComponent } from '../lead-filter/lead-filter.component';
import { GenericCountComponent } from 'src/app/shared/generic-count/generic-count.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lead-toolbar',
  templateUrl: './lead-toolbar.component.html',
  styleUrls: ['./lead-toolbar.component.css']
})
export class LeadToolbarComponent implements OnInit {
 @Input()selectedLeads:any = [];
 @Input()checkAll:any;
 @Input()totalCount:any;
 @Output()selectedSort = new EventEmitter()
  data!: any;
  leadSearch:any;
  serachForm!:FormGroup;
  @Output()selectedSearch = new EventEmitter()
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}

  ngOnInit(): void {}
  
  addCount(){
    if(this.checkAll){
      this.data = 'All'
      }else{
         this.data = this.selectedLeads.length
      }
  }
  onSelect(event:any){
    this.selectedSort.emit(event)
  }
  search(event:any){
    this.selectedSearch.emit(event)
  }
   onSearchInputChange() {
    if (!this.leadSearch) {
      this.selectedSearch.emit(this.leadSearch)
    }
  }
  bulkVideoCall(){
    const dialogRef = this.dialog.open(LeadVideoCallComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
    
  }
  openVideoCall(){
    this.addCount()
   
    let data = `Do You Want To Send SMS To ${this.data} Leads`
    const dialogRef = this.dialog.open(GenericCountComponent, {
      width:'40%',
      data:data
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'yes'){
       this.bulkVideoCall()
      }
    });
  }
  bulkSMS(){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(LeadSMSComponent,config);
  }
  openSMS(name:any): void {
    this.addCount()
   
    let data = `Do You Want To Send SMS To ${this.data} Leads`
    const dialogRef = this.dialog.open(GenericCountComponent, {
      width:'40%',
      data:data
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'yes'){
       this.bulkSMS()
      }
    });
  }
  openWhatsAppChat(){
    this.addCount()
   
    let data = `Do You Want To Send WhatsApp To ${this.data} Leads`
    const dialogRef = this.dialog.open(GenericCountComponent, {
      width:'40%',
      data:data

    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'yes'){
       this.bulkWhatsAppChat();
      }
    });
  }
  bulkWhatsAppChat(){
    const dialogRef = this.dialog.open(LeadWhatsappChatComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  bulkOpenEmailChat(name?:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {bulkIds:this.selectedLeads,allChecked:this.checkAll}
    };
    this._bottomSheet.open(LeadEmailComponent,config);
  }
  openEmailChat(selectedData?:any){
    this.addCount()
   
    let data = `Do You Want To Send Email To ${this.data} Leads`
    const dialogRef = this.dialog.open(GenericCountComponent, {
      width:'40%',
      data: data
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'yes'){
       this.bulkOpenEmailChat()
      }
    });
  }
  openReferLead(){
    const dialogRef = this.dialog.open(ReferLeadComponent, {
      width:'40%',
      data:{leadId:this.selectedLeads},
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  
  filterLead(){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
    };
    this._bottomSheet.open(LeadFilterComponent,config);
  }
  
  referLead(){
    this.addCount()
   
    let data = `Do You Want To Refer ${this.data} Leads`
    const dialogRef = this.dialog.open(GenericCountComponent, {
      width:'40%',
      data:data,
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'yes'){
       this.openReferLead()
      }
    });
  }
}
