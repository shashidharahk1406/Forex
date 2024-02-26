import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationListVideoCallComponent } from '../application-list-video-call/application-list-video-call.component';
import { ApplicationListSmsComponent } from '../application-list-sms/application-list-sms.component';
import { ApplicationListWhatsappComponent } from '../application-list-whatsapp/application-list-whatsapp.component';
import { ApplicationListEmailComponent } from '../application-list-email/application-list-email.component';
@Component({
  selector: 'app-application-list-tool-bar',
  templateUrl: './application-list-tool-bar.component.html',
  styleUrls: ['./application-list-tool-bar.component.css']
})
export class ApplicationListToolBarComponent implements OnInit {

  @Input()selectedLeads:any = [];
  @Input()checkAll:any;
  @Output()selectedSort = new EventEmitter()
   data!: any;
   constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}
 
   ngOnInit(): void {}
   addCount(){
     if(this.checkAll){
       this.data = 'All'
       }else{this.data = this.selectedLeads.length}
   }
   onSelect(event:any){
     this.selectedSort.emit(event)
   }
   bulkVideoCall(){
     const dialogRef = this.dialog.open(ApplicationListVideoCallComponent, {
       width:'45%',
     });
     dialogRef.disableClose=true
   
     dialogRef.afterClosed().subscribe((result:any) => {
       //console.log('The dialog was closed');
     });
     
   }
   openVideoCall(){
    //  this.addCount()
    
    //  let data = `Do You Want To Send SMS To ${this.data} Leads`
    //  const dialogRef = this.dialog.open(GenericCountComponent, {
    //    width:'40%',
    //    data:data
    //  });
   
    //  dialogRef.afterClosed().subscribe((result:any) => {
    //    if(result === 'yes'){
    //     this.bulkVideoCall()
    //    }
    //  });
   }
   bulkSMS(){
     const config: MatBottomSheetConfig = {
       panelClass: 'lead-bottom-sheet',
       data: {name:name},
       disableClose: true
     };
     this._bottomSheet.open(ApplicationListSmsComponent,config);
   }
   openSMS(name:any): void {
    //  this.addCount()
    
    //  let data = `Do You Want To Send SMS To ${this.data} Leads`
    //  const dialogRef = this.dialog.open(GenericCountComponent, {
    //    width:'40%',
    //    data:data
    //  });
   
    //  dialogRef.afterClosed().subscribe((result:any) => {
    //    if(result === 'yes'){
    //     this.bulkSMS()
    //    }
    //  });
   }
   openWhatsAppChat(){
    //  this.addCount()
    
    //  let data = `Do You Want To Send WhatsApp To ${this.data} Leads`
    //  const dialogRef = this.dialog.open(GenericCountComponent, {
    //    width:'40%',
    //    data:data
 
    //  });
   
    //  dialogRef.afterClosed().subscribe((result:any) => {
    //    if(result === 'yes'){
    //     this.bulkWhatsAppChat();
    //    }
    //  });
   }
   bulkWhatsAppChat(){
     const dialogRef = this.dialog.open(ApplicationListWhatsappComponent, {
       width:'45%',
     });
     dialogRef.disableClose=true
     dialogRef.afterClosed().subscribe((result:any) => {
       //console.log('The dialog was closed');
     });
   }
   bulkOpenEmailChat(name?:any){
     const config: MatBottomSheetConfig = {
       panelClass: 'lead-bottom-sheet',
       data: {name:name},
       disableClose: true
     };
     this._bottomSheet.open(ApplicationListEmailComponent,config);
   }
   openEmailChat(name?:any){
    //  this.addCount()
    
    //  let data = `Do You Want To Send Email To ${this.data} Leads`
    //  const dialogRef = this.dialog.open(GenericCountComponent, {
    //    width:'40%',
    //    data:data
 
    //  });
   
    //  dialogRef.afterClosed().subscribe((result:any) => {
    //    if(result === 'yes'){
    //     this.bulkOpenEmailChat()
    //    }
    //  });
   }
   openReferLead(){
    //  const dialogRef = this.dialog.open(ReferLeadComponent, {
    //    width:'40%',
    //    data:{leadId:this.selectedLeads},
    //  });
   
    //  dialogRef.afterClosed().subscribe((result:any) => {
    //    //console.log('The dialog was closed');
    //  });
   }
   
   filterLead(){
    //  const config: MatBottomSheetConfig = {
    //    panelClass: 'lead-bottom-sheet',
    //  };
    //  this._bottomSheet.open(LeadFilterComponent,config);
   }
   
   referLead(){
    //  this.addCount()
    
    //  let data = `Do You Want To Refer ${this.data} Leads`
    //  const dialogRef = this.dialog.open(GenericCountComponent, {
    //    width:'40%',
    //    data:data,
    //  });
   
    //  dialogRef.afterClosed().subscribe((result:any) => {
    //    if(result === 'yes'){
    //     this.openReferLead()
    //    }
    //  });
   }
 }
 