import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AddNewApplicationListComponent } from '../add-new-application-list/add-new-application-list.component';
import { UploadApplicationListComponent } from '../upload-application-list/upload-application-list.component';

@Component({
  selector: 'app-application-list-card',
  templateUrl: './application-list-card.component.html',
  styleUrls: ['./application-list-card.component.css']
})
export class ApplicationListCardComponent implements OnInit {
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

   
  openBottomSheet(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(AddNewApplicationListComponent,config);
  }
  uploadLeads(): void{
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(UploadApplicationListComponent,config);
  }
   

}
