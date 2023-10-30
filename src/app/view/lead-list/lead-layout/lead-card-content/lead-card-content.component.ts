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
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-lead-card-content',
  templateUrl: './lead-card-content.component.html',
  styleUrls: ['./lead-card-content.component.css']
})
export class LeadCardContentComponent implements OnInit {
  @Input()leadData:any = [];
  @Output()deleteLead = new EventEmitter()
  @Output()selectedSort = new EventEmitter()
  expandPanel=false;
  morePanel: boolean = false;
  expandedCardIndex: number = -1; 
  selectedCheckboxIds: any = [];
  checked: boolean = false;
  selectAllChecked: boolean = false;
  checkAll:boolean = false;
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) {}
  delete(event:any){
    this.deleteLead.emit(event);
  }
  ngOnInit(): void {
    this.selectedCheckboxIds = [];
  }
  openMorePanel(){
    this.morePanel = !this.morePanel
  }
  onChange(event:any){
    this.selectedSort.emit(event)
  }
  onCheckboxChange(event: MatCheckboxChange, itemId: string) {
    if (event.checked) {
      // Checkbox is checked, add the item ID to the array
      this.selectedCheckboxIds.push(itemId);
      if(this.selectedCheckboxIds.length === this.leadData.length)
      this.checkAll = true
    } else {
      // Checkbox is unchecked, remove the item ID from the array
      const index = this.selectedCheckboxIds.indexOf(itemId);
      if (index !== -1) {
        this.selectedCheckboxIds.splice(index, 1);
        this.checkAll = false
      }
    }
  }
  

selectAll():any {
  // Toggle the selectAllChecked state
  this.checkAll = !this.checkAll;

  if (this.checkAll) {
    // If "Select All" is checked, add all IDs to the selectedCheckboxIds array
    this.selectedCheckboxIds = this.leadData.map((item:any) => item.id);
    this.checked = true
  } else {
    // If "Select All" is unchecked, clear the selectedCheckboxIds array
    this.selectedCheckboxIds = [];
    this.checked = false
  }
  
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
      data: name
    };
    this._bottomSheet.open(LeadEditComponent,config);
  }
}
