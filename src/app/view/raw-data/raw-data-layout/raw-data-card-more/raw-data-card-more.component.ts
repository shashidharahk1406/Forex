import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { GenericDeleteComponent } from 'src/app/shared/generic-delete/generic-delete.component';
import { RawDataEditComponent } from '../raw-data-edit/raw-data-edit.component';
import { RawDataViewAllComponent } from '../raw-data-view-all/raw-data-view-all.component';
import { RawDataFollowupComponent } from '../raw-data-followup/raw-data-followup.component';
import { RawDataReferLeadComponent } from '../raw-data-refer-lead/raw-data-refer-lead.component';
import { RawDataNoteComponent } from '../raw-data-note/raw-data-note.component';


@Component({
  selector: 'app-raw-data-card-more',
  templateUrl: './raw-data-card-more.component.html',
  styleUrls: ['./raw-data-card-more.component.css']
})
export class RawDataCardMoreComponent implements OnInit {
  @Input()leadName:any
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  editLead(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(RawDataEditComponent,config);
  }
  openViewAll(name:any){
    const dialogRef = this.dialog.open(RawDataViewAllComponent, {
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
    this._bottomSheet.open(RawDataFollowupComponent,config);
  }
  addNote(){
    const dialogRef = this.dialog.open(RawDataNoteComponent, {
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
    const dialogRef = this.dialog.open(RawDataReferLeadComponent, {
      width:'40%'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
}
