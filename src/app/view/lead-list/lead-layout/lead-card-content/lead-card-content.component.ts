import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { BaseServiceService } from 'src/app/service/base-service.service';
import { ApiService } from 'src/app/service/API/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lead-card-content',
  templateUrl: './lead-card-content.component.html',
  styleUrls: ['./lead-card-content.component.css']
})
export class LeadCardContentComponent implements OnInit {
  @Input()leadData:any = [];
  public leadData2:any;
  @Output()deleteLead = new EventEmitter()
  @Output()selectedSort = new EventEmitter()
  // @Output()expandPanel=false;
  @Input()totalCount:any;
  @Input()allLeadIds:any = [];
  morePanel: boolean = false;
  expandedCardIndex: number = -1; 
  selectedCheckboxIds: any = [];
  checked:boolean = false;
  selectAllChecked: boolean = false;
  checkAll:boolean = false;
  @Output()selectedSearch = new EventEmitter;
  leadAllIds: any = [];
  @Output()refresh = new EventEmitter;
  leadItem: any;
  searchEvent: any;

  constructor(
    private _bottomSheet:  MatBottomSheet,
    private dialog: MatDialog,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private emit:AddLeadEmitterService,
    private emit2:EmitService
    ) {}
  delete(event:any){
    this.deleteLead.emit(event);
  }
  ngOnInit(): void {
    this.deleteBulk()
   this.selectedCheckboxIds = [];
  //  console.log(this.leadData,"this.leadData in ngoninit");
   }
  ngOnChanges(changes: SimpleChanges) {
    this.api.setLeadData(this.leadData);
    // console.log(this.leadData,"this.leadData in ngonchnages");
    
    
   
    if (changes['leadData']) {
     
      
      this.leadData2 = this.api.getLeadData();
      // console.log(this.leadData2,"this.leadData2");
      // this.selectedCheckboxIds = [];
      this.emit.triggerGet$.subscribe(() => {
       this.selectedCheckboxIds = [] 
      });
      if (this.selectedCheckboxIds.length > 0 && this.selectedCheckboxIds.length === this.totalCount) {
        this.checkAll = true;
        this.checkBoxData()
        
      } else{
        this.checkAll = false;
        this.checkBoxData()
      }
    }

  }
  expandCard(index: number) {
    if (this.expandedCardIndex === index) {
      this.expandedCardIndex = -1;
    } else {
      this.expandedCardIndex = index;
    }
  }
  openCall(selectedData:string){
    const dialogRef = this.dialog.open(LeadCallComponent, {
      width:'30%',
      data: selectedData
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      ////console.log('The dialog was closed');
    }); 
  }
  openSMS(selectedData:any): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      disableClose: true,
      data:selectedData
    };
    this._bottomSheet.open(LeadSMSComponent,config);
  }
  openWhatsAppChat(){
    const dialogRef = this.dialog.open(LeadWhatsappChatComponent, {
      width:'45%',
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      ////console.log('The dialog was closed');
    });
  }
  openEmailChat(selectedData:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      disableClose: true,
      data: {selectedData:selectedData,bulkIds:this.selectedCheckboxIds,allChecked:this.checked}
    };
    this._bottomSheet.open(LeadEmailComponent,config);
  }
  openVideoCall(){
    const dialogRef = this.dialog.open(LeadVideoCallComponent, {
      width:'45%',
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      ////console.log('The dialog was closed');
    });
  }
  
  openViewAll(name:any){
    const dialogRef = this.dialog.open(LeadViewAllComponent, {
      width:'60%',
      data: {name:name}
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      ////console.log('The dialog was closed');
    });
  }
  editLead(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: name,
      disableClose: true
    };
    this._bottomSheet.open(LeadEditComponent,config);
  }
  openMorePanel(){
    this.morePanel = !this.morePanel
  }
  onChange(event:any){
    this.selectedSort.emit(event)
  }
  search(event:any){
    this.searchEvent = event
   this.selectedSearch.emit(event)
  //  console.log(event,"lead search")
  }
 
  selectAll(event:any) {
   // //console.log(event,"EVENT")
    this.checkAll = !this.checkAll;
    if (event.checked == true) {
      //console.log(this.allLeadIds,"allleaids")
      // If "Select All" is checked, add all IDs to the selectedCheckboxIds array
      // console.log(this.allLeadIds,"this.allLeadIds in select all function");
      
    
     this.leadData2.forEach((element:any) => {
      if (element ) {
        element.checked = true;
        this.selectedCheckboxIds = this.allLeadIds;
      }
    });
    // //console.log(this.selectedCheckboxIds,"LEADIDS")
      this.checkBoxData()
     // this.checked = false
    } else  {
      // If "Select All" is unchecked, clear the selectedCheckboxIds array
      this.selectedCheckboxIds = [];
      this.leadData2.forEach((element:any) => {
        if (element ) {
          element.checked = false;
        }
      });
        
    }
    
  }
  
 
  onCheckboxChange(event: MatCheckboxChange, itemId: string) {
    // console.log(itemId,"itemId")
    if (event.checked) {
      // Checkbox is checked, add the item ID to the array if it's not already there
      if (!this.selectedCheckboxIds) {
        this.selectedCheckboxIds = [];
      }
  
      else if (!this.selectedCheckboxIds.includes(itemId)) {
        this.selectedCheckboxIds.push(itemId);
        if (this.selectedCheckboxIds.length === this.totalCount&&this.totalCount>0) {
          this.checkAll = true;
          this.checkBoxData()
          
        } 
      }
      
      else{
        this.checkAll = false;
      }
    } else {
      // Checkbox is unchecked, remove the item ID from the array if it exists
      const index = this.selectedCheckboxIds.indexOf(itemId);
      if (index !== -1) {
        this.selectedCheckboxIds.splice(index, 1);
        this.checkAll = false;
        this.checkBoxData()
      }
    }
  }
  refreshLead(event:any){
    this.refresh.emit(event)
    this.selectedCheckboxIds = []
  }
  checkBoxData(){
    for (const selectedId of this.selectedCheckboxIds) {
     
      
      const leadItem = this.leadData2.find((item:any) => item.user_data.id === selectedId);
     
      
      if (leadItem ) {
        leadItem.checked = true;
      }
    }
   
  }
  onSearchInputChange(){
    this.emit.leadFilter.subscribe((res) => {
      if (res) {
        this.emit.goBack.next(true)
      }else{
        this.emit.goBack.next(true)
        this.emit.triggerGet()
      }
    });
  }
deleteBulk(){
  this.emit2.deleteAll.subscribe((res:any)=>{
    if(res === true){
      let data = {
        lead_ids: this.selectedCheckboxIds
      }
      this._baseService.postData(`${environment.lead_bulk_delete}`,data).subscribe((res:any)=>{
        if(res){
         this.api.showSuccess(res.message)
         this.emit.triggerGet()
        }
      },((error:any)=>{
        this.api.showError(error.error.message)
      }))
    }
  })
}
  
}
