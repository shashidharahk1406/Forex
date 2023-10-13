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


@Component({
  selector: 'app-leadcard-more',
  templateUrl: './leadcard-more.component.html',
  styleUrls: ['./leadcard-more.component.css']
})
export class LeadcardMoreComponent implements OnInit {
  @Input()leadName:any;
  @Input()leadId:any;
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
      data: {name:name}
    };
    this._bottomSheet.open(LeadEditComponent,config);
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
  addFollowUp(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(LeadFollowupComponent,config);
  }
  addNote(){
    const dialogRef = this.dialog.open(LeadNoteComponent, {
      width:'40%'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  delete(name:any){
    const dialogRef = this.dialog.open(GenericDeleteComponent, {
      width:'35%',
      data: {name:name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes'){
      this.deleteEvent.emit(this.leadId)
      this._baseService.delete(`${environment.lead_list}${this.leadId}/`).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message)
          this.getLeadData()
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
     this.api.showError(error.error.message)
    })
   }
  referLead(){
    const dialogRef = this.dialog.open(ReferLeadComponent, {
      width:'40%'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
}
