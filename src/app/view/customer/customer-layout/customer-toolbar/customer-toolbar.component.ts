import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerPaymentDetailsComponent } from '../customer-payment-details/customer-payment-details.component';
import { GenericCountComponent } from 'src/app/shared/generic-count/generic-count.component';
import { CustomerFilterComponent } from '../customer-filter/customer-filter.component';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { environment } from 'src/environments/environment';
import { CustomerReferLeadComponent } from '../customer-refer-lead/customer-refer-lead.component';
import { CustomerEmailComponent } from '../customer-email/customer-email.component';
import { CustomerWhatsappChatComponent } from '../customer-whatsapp-chat/customer-whatsapp-chat.component';
import { CustomerSmsComponent } from '../customer-sms/customer-sms.component';
import { CustomerVideoCallComponent } from '../customer-video-call/customer-video-call.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-customer-toolbar',
  templateUrl: './customer-toolbar.component.html',
  styleUrls: ['./customer-toolbar.component.css']
})
export class CustomerToolbarComponent implements OnInit {

  @Input()selectedLeads:any = [];
  @Input()checkAll:any;
  @Input()totalCount:any;
  @Output()selectedSort = new EventEmitter()
  @Output()selectedSearch = new EventEmitter()
  @Output()refresh = new EventEmitter()
  @Input()leadData:any = [];
   data!: any;
   
   searchForm!:FormGroup;
   showBtn: boolean = false;
   exportReference: any;
   filtered = false;
   submitted: boolean = false;
   user_role:any;
   
   constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog,
     private _baseService:BaseServiceService,
     private api:ApiService,
     private emit:EmitService,
     private addEventEmitter:AddLeadEmitterService,
     private fb:FormBuilder
     ) {

      this.user_role = localStorage.getItem('user_role')?.toLowerCase();
   }
 
   ngOnInit():any {
     this.initForm()
     this.addEventEmitter.customerFilterIcon.subscribe(
       (resp:any)=>{
        //console.log(resp,"RESPONSE")
        if(resp === 'true'){
         this.filtered= true
        }else{
         this.filtered= false
        }
        
       }
       
     )
     this.addEventEmitter.goBack.subscribe((resp:any)=>{
       if(resp === true){ 
         this.searchForm.patchValue({
           searchText:''
         })
       }
     })
     this.addEventEmitter.leadRefresh.subscribe((resp:any)=>{
       if(resp === true){ 
         this.searchForm.patchValue({
           searchText:''
         })
       }
     })
   }
   initForm(){
     this.searchForm = this.fb.group({
       searchText:['']
     })
   }
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
   applyFilter(event: any) {
     //console.log(event.target.value);
     if(event.target.value==''){
       this.selectedSearch.emit('')
       this.emit.allocateSearch.next('init')
     }
     
   }
   search(event:any){
     // if(event.target.value.length >0){
       this.selectedSearch.emit(this.searchForm.value.searchText)
     //}
    
   }
   //  onSearchInputChange() {
   //   this.leadSearch = ""
   //   if (!this.leadSearch) {
   //     this.selectedSearch.emit(this.leadSearch)
   //   }
   // }
   bulkVideoCall(){
     const dialogRef = this.dialog.open(CustomerVideoCallComponent, {
       width:'45%',
     });
     dialogRef.disableClose=true
     dialogRef.afterClosed().subscribe((result:any) => {
       //console.log('The dialog was closed');
       this.refreshLead('event')
     });
     
   }
   openVideoCall(){
    console.log(this.data,"data in video call");
    
     this.addCount()
     if(this.data !== 0||this.data==undefined){
     let data = `Do You Want To Send A Video Call Link To ${this.data} Leads`
     const dialogRef = this.dialog.open(GenericCountComponent, {
       width:'40%',
       data:data
     });
     dialogRef.disableClose=true
   
     dialogRef.afterClosed().subscribe((result:any) => {
       if(result === 'yes'){
        this.bulkVideoCall()
        this.refreshLead('event')
       }
     });
   }else{
     this.api.showWarning('Please select atleast one lead')
   }
   }
   bulkSMS(){
     const config: MatBottomSheetConfig = {
       panelClass: 'lead-bottom-sheet',
       data: {name:name},
       disableClose: true
     };
     this._bottomSheet.open(CustomerSmsComponent,config);
   }
   openSMS(name:any): void {
     this.addCount()
     if(this.data !== 0){
     let data = `Do You Want To Send SMS To ${this.data} Leads`
     const dialogRef = this.dialog.open(GenericCountComponent, {
       width:'40%',
       data:data
     });
     dialogRef.disableClose=true
     dialogRef.afterClosed().subscribe((result:any) => {
       if(result === 'yes'){
        this.bulkSMS()
        this.refreshLead('event')
       }
     })}
     else{
       this.api.showWarning('Please select atleast one lead')
     }
   }
   openWhatsAppChat(){
     this.addCount()
     if(this.data !== 0){
     let data = `Do You Want To Send WhatsApp To ${this.data} Leads`
     const dialogRef = this.dialog.open(GenericCountComponent, {
       width:'40%',
       data:data
     });
     dialogRef.disableClose=true
   
     dialogRef.afterClosed().subscribe((result:any) => {
       if(result === 'yes'){
        this.bulkWhatsAppChat();
        this.refreshLead('event')
       }
     });
   }else{
     this.api.showWarning('Please select atleast one lead to download')
   }
   }
   bulkWhatsAppChat(){
     const dialogRef = this.dialog.open(CustomerWhatsappChatComponent, {
       width:'45%',
     });
     dialogRef.disableClose=true
     dialogRef.afterClosed().subscribe((result:any) => {
       //console.log('The dialog was closed');
       this.refreshLead('event')
     });
   }
   bulkOpenEmailChat(name?:any){
     const config: MatBottomSheetConfig = {
       panelClass: 'lead-bottom-sheet',
       disableClose: true,
       data: {bulkIds:this.selectedLeads,allChecked:this.checkAll}
     };
     this._bottomSheet.open(CustomerEmailComponent,config);
   }
   openEmailChat(selectedData?:any){
     this.addCount()
     if(this.data !== 0){
     let data = `Do You Want To Send Email To ${this.data} Leads`
     const dialogRef = this.dialog.open(GenericCountComponent, {
       width:'40%',
       data: data
     });
     dialogRef.disableClose=true
     dialogRef.afterClosed().subscribe((result:any) => {
       if(result === 'yes'){
        this.bulkOpenEmailChat()
        this.refreshLead('event')
       }
     });
   }else{
     this.api.showWarning('Please select atleast one lead')
   }
   }
   openReferLead(){
     const dialogRef = this.dialog.open(CustomerReferLeadComponent, {
       width:'40%',
       data:{leadId:this.selectedLeads},
     });
     dialogRef.disableClose=true
     dialogRef.afterClosed().subscribe((result:any) => {
       //console.log('The dialog was closed');
       //this.refreshLead('event')
     });
   }
   downloadLead(){
   if(this.selectedLeads.length >0 ){
     this.submitted = true
     this.exportReference = `${environment.export_leads}?ids=${this.selectedLeads}`
     setTimeout(() => {
       this.addEventEmitter.triggerGet() 
     },2000);
     
   }else{
     if(!this.submitted){
     this.api.showWarning('Please select atleast one lead to download')
   }
   }
  
   
   }
   filterLead(){
     const config: MatBottomSheetConfig = {
       panelClass: 'lead-bottom-sheet',
       disableClose: true
     };
     this._bottomSheet.open(CustomerFilterComponent,config);
   }
   onDeleteAll(){
     this.addCount()
     if(this.data !== 0){
     let data = `Do You Want To Delete ${this.data} Leads`
     const dialogRef = this.dialog.open(GenericCountComponent, {
       width:'40%',
       data:data,
     });
     dialogRef.disableClose=true
   
     dialogRef.afterClosed().subscribe((result:any) => {
       if(result === 'yes'){
        this.emit.deleteAll.next(true)
       }
     });
   }else{
     this.api.showWarning('Please select atleast one lead')
   }
   }
   referLead(){
     this.addCount()
     if(this.data !== 0){
     let data = `Do You Want To Refer ${this.data} Leads`
     const dialogRef = this.dialog.open(GenericCountComponent, {
       width:'40%',
       data:data,
     });
     dialogRef.disableClose=true
   
     dialogRef.afterClosed().subscribe((result:any) => {
       if(result === 'yes'){
        this.openReferLead()
       }
     });
   }else{
     this.api.showWarning('Please select atleast one lead')
   }
   }
   refreshLead(event:any){
     this.refresh.emit(event)
   }
   onClickLink(){
     this.addCount()
     if(this.data !== 0){
       let data = `Do You Want To Send A Link To  ${this.data} Leads`
       const dialogRef = this.dialog.open(GenericCountComponent, {
         width:'40%',
         data:data,
       });
       dialogRef.disableClose=true
     
       dialogRef.afterClosed().subscribe((result:any) => {
         if(result === 'yes'){
           this.paymentDetailsLink()
         }
       });
     }else{
       this.api.showWarning('Please select atleast one lead')
     }
    
   }
   paymentDetailsLink(){
     const dialogRef = this.dialog.open(CustomerPaymentDetailsComponent, {
       width:'30%',
       height:'70%',
       data:{data:this.selectedLeads,name:'BULK'},
     });
     dialogRef.disableClose=true
   
     dialogRef.afterClosed().subscribe((result:any) => {
       this.refresh.emit('event')
     });
   }
 }
 


