import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-lead-filter',
  templateUrl: './lead-filter.component.html',
  styleUrls: ['./lead-filter.component.css'],
  animations: [
    trigger('sheetState', [
      state('open', style({
        transform: 'translateY(0)'
      })),
      state('closed', style({
        transform: 'translateY(0)'
      })),
      transition('closed => open', animate('0.10s ease-in-out')),
      transition('open => closed', animate('0.10s ease-in-out'))
    ])
  ]
})
export class LeadFilterComponent implements OnInit {
filterLead!:FormGroup
isOpen: boolean = false;
counselorList = ['All Counselors','Abhishek','Sandesh','Gokul','Rohit','Aparna'];
channelsList = ['Online', 'Offline', 'Social Media', 'Email'];
sourceList = ['Application Form', 'CAT', 'Source 3', 'Source 4'];
departmentList = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
courseList = ['2-BAJMC-Photograpy', 'Course 2', 'Course 3', 'Course 4'];
status = ['1-Untouched','2-Campus Visit','3-Call Back','4-Enrolled','5-Not Interested'];
locationList = ['Ahamednagar','New Delhi','Mumbai'];

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isOpen = !this.isOpen;
    this.initForm()
  }
  get f() {
    return this.filterLead.controls;
  }

  clearSelectField(fieldName: string) {
    this.filterLead.get(fieldName)?.reset();
  }

  onSubmit() {
    if (this.filterLead.invalid) {
      // Handle form validation errors
      return;
    }

    // Process form data
    const formData = this.filterLead.value;
    console.log('Form Data:', formData);
  }
  initForm(){
    this.filterLead = this.fb.group({
      counselors:[''],
      leadNameOrCampaignName:[''],
      channel:[''],
      source:[''],
      department:[''],
      course:[''],
      location:[''],
      yearOfPassing:[]
    })
  }
  closePopup(){
    this._bottomSheetRef.dismiss()
    this.isOpen = !this.isOpen;
  }
}
