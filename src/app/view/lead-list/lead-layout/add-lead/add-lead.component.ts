import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css'],
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
export class AddLeadComponent implements OnInit {
  isOpen = false;
  addNewLead!: FormGroup;
  seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  channels = ['Online', 'Offline', 'Social Media', 'Email'];
  sources = ['Others', 'Source 2', 'Source 3', 'Source 4'];
  priorities = ['3-Hot', 'Medium', 'Low'];
  referredTo = ['Live Chat', 'Option 2', 'Option 3'];
  stat_us = ['Callback','Closed','Enrolled','New'];
  departmentOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  courseOptions = ['Course 1', 'Course 2', 'Course 3', 'Course 4'];
  locationOptions = ['Location 1', 'Location 2', 'Location 3', 'Location 4'];
  yearOfPassingOptions = ['2020', '2021', '2022', '2023'];
  countryOptions = ['Country 1', 'Country 2', 'Country 3', 'Country 4'];
  stateOptions = ['State 1', 'State 2', 'State 3', 'State 4'];
  cityOptions = ['City 1', 'City 2', 'City 3', 'City 4'];
  newChannelOptions = ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4'];
  campaignOptions = ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4'];
  mediumOptions = ['Medium 1', 'Medium 2', 'Medium 3', 'Medium 4'];
  levelOfProgramOptions = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
  time = ['Morning', 'Afternoon', 'Evening', 'Night', 'Other'];

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isOpen = !this.isOpen;
    this.initForm()
  }

 initForm(){
  this.addNewLead = this.fb.group({
    fullName: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    highestQualification: [''],
    callTime:[''],
    campaignName: ['', Validators.required],
    season: [''],
    channel: [''],
    source: ['',Validators.required],
    priority: [''],
    referredTo: [''],
    status:['',Validators.required],
    department: ['', Validators.required],
    course: [''],
    location: [''],
    yearOfPassing: [''],
    countryId: [''],
    state: [''],
    cityName: [''],
    newChannel: [''],
    campaign: [''],
    medium: [''],
    levelOfProgram: [''],
  });


 }
    
  
  get f() {
    return this.addNewLead.controls;
  }
clearSelectField(fieldName: string) {
    this.addNewLead.get(fieldName)?.reset();
  }
  onSubmit(){}
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  closePopup(){
    this._bottomSheetRef.dismiss()
    this.isOpen = !this.isOpen;
  }
}
