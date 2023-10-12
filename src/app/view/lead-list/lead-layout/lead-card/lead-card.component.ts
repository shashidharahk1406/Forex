import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { AddLeadComponent } from '../add-lead/add-lead.component';
import { LeadUploadComponent } from '../lead-upload/lead-upload.component';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.css']
})
export class LeadCardComponent implements OnInit {
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

 
  constructor(private _bottomSheet:  MatBottomSheet,private _baseService:BaseServiceService,private api:ApiService) {}
  
   
  openBottomSheet(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(AddLeadComponent,config);
  }
  uploadLeads(): void{
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(LeadUploadComponent,config);
  }
  ngOnInit(): void {
    // this.getLeadData()
  }

  getLeadData(){
   this._baseService.getData(environment.lead_list).subscribe(res =>{
    if(res){
      console.log(res,"RESPONSE");
      this.api.showSuccess('Lead Data Available')
    }
   })
  }
   
  
}
