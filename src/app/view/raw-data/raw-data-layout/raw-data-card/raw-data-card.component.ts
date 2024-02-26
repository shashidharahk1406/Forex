import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AddNewRawDataComponent } from '../add-new-raw-data/add-new-raw-data.component';
import { UploadRawLeadDataComponent } from '../upload-raw-lead-data/upload-raw-lead-data.component';



@Component({
  selector: 'app-raw-data-card',
  templateUrl: './raw-data-card.component.html',
  styleUrls: ['./raw-data-card.component.css']
})
export class RawDataCardComponent implements OnInit {
  leadCards = [
    // Define your dummy data here
    {
      name: 'Student 1',
      badgeCount: 16,
      id: '2067638819',
      status: 'Untouched',
      leadStatus:'Fresh Lead',
      erp: true,
      phoneNumber: 1,
      chatCount: 1,
      emailCount: 0,
      personCounts: [5, 4, 2],
    },
    {
      name: 'Student 2',
      badgeCount: 5,
      id: '2067638819',
      status: 'Untouched',
      leadStatus:'Fresh Lead',
      erp: true,
      phoneNumber: 1,
      chatCount: 1,
      emailCount: 0,
      personCounts: [5, 0, 0],
    },
    {
      name: 'Student 3',
      badgeCount: 2,
      id: '2067638819',
      status: 'Untouched',
      leadStatus:'Fresh Lead',
      erp: true,
      phoneNumber: 1,
      chatCount: 1,
      emailCount: 0,
      personCounts: [5, 2, 1],
    },
    {
      name: 'Student 2',
      badgeCount: 5,
      id: '2067638819',
      status: 'Untouched',
      leadStatus:'Fresh Lead',
      erp: true,
      phoneNumber: 1,
      chatCount: 1,
      emailCount: 0,
      personCounts: [5, 0, 0],
    },
    {
      name: 'Student 3',
      badgeCount: 2,
      id: '2067638819',
      status: 'Untouched',
      leadStatus:'Fresh Lead',
      erp: true,
      phoneNumber: 1,
      chatCount: 1,
      emailCount: 0,
      personCounts: [5, 2, 1],
    },
    // Add more dummy data as needed
  ];

 
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}
  
  
  ngOnInit(): void {
  }

  openAddNew(){
    const dialogRef = this.dialog.open(AddNewRawDataComponent, {
      width:'45%',
      // minHeight:'50vh',
      // height:"90%"

    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }
  uploadLeads(): void{
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      disableClose: true
    };
    this._bottomSheet.open(UploadRawLeadDataComponent,config);
  } 
   

}
