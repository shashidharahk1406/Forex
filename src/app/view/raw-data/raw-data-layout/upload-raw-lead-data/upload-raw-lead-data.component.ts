import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-upload-raw-lead-data',
  templateUrl: './upload-raw-lead-data.component.html',
  styleUrls: ['./upload-raw-lead-data.component.css']
})
export class UploadRawLeadDataComponent implements OnInit {

  uploadLeadForm!:FormGroup
  isOpen: boolean = false;  
  allChannel:any = [];
  allSource :any=[];
  allStatus :any=[];
  allSubStatus :any=[];
  allLevel :any=[];
  allDepartment :any=[];
  allPriority :any=[];
  allCourse :any=[];
  allCountry :any=[];
  allCity :any=[];
  file:any = File ;
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


  constructor(private api:ApiService,private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder) {}

    ngOnInit(): void {
      this.isOpen = !this.isOpen;
      this.initForm();
      this.getAllChannel()
      this.getAllSource()
      this.getAllStatus()
      this.getAllSubStatus()
      this.getAllLevel()
      this.getAllDepartment()
      this.getAllPriority()
      this.getAllCourse()
      this.getAllCountry()
      this.getAllCity()
      this.getAllUser()
    }
   
    initForm(){
      this.uploadLeadForm = this.fb.group({
       //step-1
       channel_id:[''],
       source_id:[''],
       status_id:[''],
      //  sub_status_id:[''],
       leadOwner:[''],
       refered_to_ids:[''],
       priority_id:[''],
       course_id:[''],
       country_id:[''],
       city_id:[''],
       level_of_program_id:[''],
       departent_id:[''],
       send_welcome_email:[''],
       send_welcome_sms:[''],
       //step-2
       sample_file:['']
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
    getAllChannel(){
      this.api.getAllChannel().subscribe(
        (resp:any)=>{
          this.allChannel=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllSource(){
      this.api.getAllSource().subscribe(
        (resp:any)=>{
          this.allSource=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllStatus(){
      this.api.getAllStatus().subscribe(
        (resp:any)=>{
          this.allStatus=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllSubStatus(){
      this.api.getAllSubStatus().subscribe(
        (resp:any)=>{
          this.allSubStatus=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllLevel(){
      this.api.getAllLevelOfProgram().subscribe(
        (resp:any)=>{
          this.allLevel=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllDepartment(){
      this.api.getAllDepartment().subscribe(
        (resp:any)=>{
          this.allDepartment=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllPriority(){
      this.api.getAllPriority().subscribe(
        (resp:any)=>{
          this.allPriority=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllCourse(){
      this.api.getAllCourse().subscribe(
        (resp:any)=>{
          this.allCourse=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllCountry(){
      this.api.getAllCountry().subscribe(
        (resp:any)=>{
          this.allCountry=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllCity(){
      this.api.getAllCity().subscribe(
        (resp:any)=>{
          this.allCity=resp.results
        },
        (error:any)=>{
  
        }
        
      )
    }
    getAllUser(){
      this.api.getAllUser().subscribe(
        (resp:any)=>{
          console.log(resp);
          
        },
        (error:any)=>{
  
        }
        
      )
    }
    onChange(event:any) {
      console.log('event',event.target.files[0])
      this.file = event.target.files[0]
      this.uploadLeadForm.get('sample_file')?.setValue(this.file)
      console.log(this.file)
     }
     baseurl= environment.live_url;
    onSubmit(){
      const fd = new FormData()
      fd.append('sample_file',this.file,this.file.name)
      console.log(this.uploadLeadForm.value);
      if(this.uploadLeadForm.invalid){

      }
      else{
        this.api.postRawdata(this.uploadLeadForm.value).subscribe(
          (resp:any)=>{
            console.log(resp)
          },
          (error:any)=>{
            console.log(error);
            
          }
        )
      }
      
    }

}
