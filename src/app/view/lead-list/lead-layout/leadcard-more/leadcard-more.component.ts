import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { LeadEditComponent } from '../lead-edit/lead-edit.component';
import { LeadViewAllComponent } from '../lead-view-all/lead-view-all.component';
import { MatDialog } from '@angular/material/dialog';
import { LeadFollowupComponent } from '../lead-followup/lead-followup.component';
import { LeadNoteComponent } from '../lead-note/lead-note.component';
import { GenericDeleteComponent } from 'src/app/shared/generic-delete/generic-delete.component';
import { ReferLeadComponent } from '../refer-lead/refer-lead.component';


@Component({
  selector: 'app-leadcard-more',
  templateUrl: './leadcard-more.component.html',
  styleUrls: ['./leadcard-more.component.css']
})
export class LeadcardMoreComponent implements OnInit {
  @Input()leadName:any
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) { }

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
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
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
