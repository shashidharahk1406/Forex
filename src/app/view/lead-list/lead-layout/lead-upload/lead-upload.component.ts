import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-lead-upload',
  templateUrl: './lead-upload.component.html',
  styleUrls: ['./lead-upload.component.css']
})
export class LeadUploadComponent implements OnInit {
  uploadLeadForm!:FormGroup
  isOpen: boolean = false;
  channelList = ['Telephonic','Social Media','Offline','Email','SMS'];
  sourceList = ['Partners - TMV','Option-2'];
  priorityList = ['1-Hot','2-Warm','Medium','Low'];
  leadOwnerList = ['Rohith','Sandesh','Abhishek'];
  statusList = ['New','Call Back','Closed','Enrolled'];
  referedToList = ['Live Chat','Option-1','Option-2'];
  departmentList = ['Instrumentation','Medical','Finance'];
  courseList = ['1-BAJMC-Film','Option-1','Option-2'];
  countryList = ['India','Afganistan','Africa'];
  cityList = ['New Delhi','Abhayopuri','Sudon'];
  reasonList = ['Reason-1','Reason-2','Reason-3'];
  selectedFiles: any;


  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder) {}

    ngOnInit(): void {
      this.isOpen = !this.isOpen;
      this.initForm();
    }
   
    initForm(){
      this.uploadLeadForm = this.fb.group({
       //step-1
       channel:[''],
       source:[''],
       priority:[''],
       status:[''],
       subStatus:[''],
       leadOwner:['',Validators.required],
       reason:[''],
       referedTo:['',Validators.required],
       //step-2
       department:[''],
       course:[''],
       country:[''],
       city:[''],
       welcomeEmail:[''],
       welcomeSms:[''],
       //step-3
       leadUpload:['',Validators.required]
      });
    }
    selectFile(event:any) {
      this.selectedFiles = event.target.files;
    }
    get f() {
      return this.uploadLeadForm.controls;
    }
    clearSelectField(fieldName: string) {
        this.uploadLeadForm.get(fieldName)?.reset();
      }
    closePopup(){
      this._bottomSheetRef.dismiss()
      this.isOpen = !this.isOpen;
    }
    onSubmit(){}
}
