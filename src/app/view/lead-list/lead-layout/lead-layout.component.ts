import { Component, OnInit } from '@angular/core';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { MatBottomSheet,MatBottomSheetConfig  } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-lead-layout',
  templateUrl: './lead-layout.component.html',
  styleUrls: ['./lead-layout.component.css']
})
export class LeadLayoutComponent implements OnInit {

 
    constructor(private _bottomSheet:  MatBottomSheet) {}
  
   
    openBottomSheet(): void {
      const config: MatBottomSheetConfig = {
        panelClass: 'lead-bottom-sheet'
      };
      this._bottomSheet.open(AddLeadComponent,config);
    }

  ngOnInit(): void {
  }

}