import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { LeadEditComponent } from '../lead-edit/lead-edit.component';
import { LeadViewAllComponent } from '../lead-view-all/lead-view-all.component';
import { MatDialog } from '@angular/material/dialog';
import { LeadFollowupComponent } from '../lead-followup/lead-followup.component';
import { LeadNoteComponent } from '../lead-note/lead-note.component';
import { GenericDeleteComponent } from 'src/app/shared/generic-delete/generic-delete.component';
import { ReferLeadComponent } from '../refer-lead/refer-lead.component';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { ApiService } from 'src/app/service/API/api.service';
import { environment } from 'src/environments/environment';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { AdmissionDetailsComponent } from '../admission-details/admission-details.component';
import { DocsProcessComponent } from '../docs-process/docs-process.component';
import { PaymentStatusComponent } from '../payment-status/payment-status.component';
import { PaymentProofComponent } from '../payment-proof/payment-proof.component';


@Component({
  selector: 'app-leadcard-more',
  templateUrl: './leadcard-more.component.html',
  styleUrls: ['./leadcard-more.component.css']
})
export class LeadcardMoreComponent implements OnInit {
  @Input()leadName:any;
  @Input()leadId:any;
  @Input()counselor_id:any;
  @Input()item:any;
  @Output()deleteEvent = new EventEmitter()
  constructor(
    private _bottomSheet:  MatBottomSheet,
    private dialog: MatDialog,
    private _baseService:BaseServiceService,
    private api:ApiService) { }

  ngOnInit(): void {
  }
  editLead(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: this.item,
      disableClose: true
    };
    this._bottomSheet.open(LeadEditComponent,config);
  }
  openViewAll(name:any){
    const dialogRef = this.dialog.open(LeadViewAllComponent, {
      width:'60%',
      data: {name:name}
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  addFollowUp(item:any){
    console.log("===>>",item.user);
    
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name,item:item},
      disableClose: true
    };
    this._bottomSheet.open(LeadFollowupComponent,config);
  }
  addNote(){
    const dialogRef = this.dialog.open(LeadNoteComponent, {
      width:'40%',
      data:this.leadId
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  delete(name:any){
    const dialogRef = this.dialog.open(GenericDeleteComponent, {
      width:'35%',
      data: {name:name}
    });
    dialogRef.disableClose=true
    console.log()
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes'){ 
      this._baseService.delete(`${environment.lead_list}${this.item.user_data.id}/`).subscribe((res:any)=>{
        if(res){
          this.deleteEvent.emit('DELETE')
          this.api.showSuccess(res.message)
        }
      },(error =>{
        this.api.showError(error.error.error.message)
      }))
      }
    });
  }
  getLeadData(){
    this._baseService.getData(environment.lead_list).subscribe((res:any) =>{
     if(res.results){
     // this.leadCards = res.results
     }
    },(error:any)=>{
      this.api.showError(this.api.toTitleCase(error.error.message))
    })
   }
  referLead(){
    const dialogRef = this.dialog.open(ReferLeadComponent, {
      width:'40%',
      data:this.leadId
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openPayment(){
    const dialogRef = this.dialog.open(PaymentDetailsComponent, {
      width:'30%',
      height:'70%',
      data:this.item
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
     if(result == 'Open'){
      this.openPaymentStatus();
     }
    });
  }
  admissionDetails(){
    const dialogRef = this.dialog.open(AdmissionDetailsComponent, {
      width:'30%',
      data:this.item
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }
  docsStatus(){
    const dialogRef = this.dialog.open(DocsProcessComponent, {
      width:'30%',
      data:this.item
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }
  openPaymentStatus(){
    const dialogRef = this.dialog.open(PaymentStatusComponent, {
      width:'30%',
      data:this.item
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
      if(result == 2 ){
        this.openPayment()
      }
    });
  }
  // openPaymentProof(){
  //   const dialogRef = this.dialog.open(PaymentProofComponent, {
  //     width:'30%',
  //     data:this.item
  //   });
  
  //   dialogRef.afterClosed().subscribe((result:any) => {
  //   });
  // }
  close(){
    this._bottomSheet.dismiss()
    window.location.reload();
  }
}
