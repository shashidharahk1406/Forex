import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-raw-data-edit',
  templateUrl: './raw-data-edit.component.html',
  styleUrls: ['./raw-data-edit.component.css'],
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
export class RawDataEditComponent implements OnInit {

  isOpen = false;
  meridian = true;
  editLead!: FormGroup;
  genderList = ['Female','Male','Others'];
  programList = ['UG','PG'];
  department = ['Medicine/ MBBS','Engineering','BBA','LLB']
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isOpen = !this.isOpen;
    this.initForm()
  }

 initForm(){
  this.editLead = this.fb.group({
   fullName:['',Validators.required],
   email:['',[Validators.required,Validators.email]],
   mobileNumber:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
   dateOfBirth:[''],
   gender:[''],
   alternateMobile:['',[Validators.pattern(/^\d{10}$/)]],
   alternateEmail:['',[Validators.email]],
   levelOfProgram:['',Validators.required],
   department:['',Validators.required]
  })
 }
 closePopup(){
  this._bottomSheetRef.dismiss()
  this.isOpen = !this.isOpen;
}
  
get f() {
  return this.editLead.controls;
}
clearSelectField(fieldName: string) {
  this.editLead.get(fieldName)?.reset();
}
onSubmit(){
  if(this.editLead.invalid){
    this.editLead.markAllAsTouched()
  }
}
selectOptionsProgrammatically() {
  const selectedValues = ['Application','Lead'];
  this.editLead.patchValue({
    leadCategory:selectedValues
  })
}
}
