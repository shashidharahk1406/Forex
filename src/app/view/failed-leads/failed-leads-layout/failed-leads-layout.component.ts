import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { FailedLeadsUploadComponent } from './failed-leads-upload/failed-leads-upload.component';

@Component({
  selector: 'app-failed-leads-layout',
  templateUrl: './failed-leads-layout.component.html',
  styleUrls: ['./failed-leads-layout.component.css']
})
export class FailedLeadsLayoutComponent implements OnInit {

  constructor(private _bottomSheet:  MatBottomSheet,) { }

  ngOnInit(): void {
  }

  openAddNew(){
    // const dialogRef = this.dialog.open(AddNewRawDataComponent, {
    //   width:'45%',
    //   // minHeight:'50vh',
    //   // height:"90%"

    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  uploadLeads(): void{
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      disableClose: true
    };
    this._bottomSheet.open(FailedLeadsUploadComponent,config);
  } 
}

