import { Component, Inject, OnInit } from '@angular/core';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { DisableChatComponent } from '../disable-chat/disable-chat.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-user-profile-list',
  templateUrl: './edit-user-profile-list.component.html',
  styleUrls: ['./edit-user-profile-list.component.css']
})
export class EditUserProfileListComponent implements OnInit {

  selectedImage:any=undefined;
  nameValidation: any;
  mobileNumberValidation: any;
  entered = false;
  allDepartment:any=[]
  allLevel:any=[]
  allRole:any=[]
  allUser:any=[]
  selectedArray:any=[]
  allDesignation:any=[]
  is_allow_for_app:boolean=false
  user_id:any
  id:any

  constructor(
    public dialogRef: MatDialogRef<EditUserProfileListComponent>,private api:ApiService, private emit:EmitService,private datePipe:DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public validationService: CommonServiceService,
    private fb: FormBuilder
  ) {
    this.id=data.userdata.id
  }

  ngOnInit(): void {
    this.initForm()

  }
  users: string[] = ['User 1', 'User 2', 'User 3'];
  levels: string[] = ['Level 1', 'Level 2', 'Level 3'];
  departments: string[] = ['Department 1', 'Department 2', 'Department 3'];

  editForm!: FormGroup;
  replaceUserForm!: FormGroup;
  user_details:any=[]
  initForm(){
    this.editForm = this.fb.group({
      first_name:['',[Validators.required]],
      last_name:[''],
      email:['',[Validators.required,Validators.email]],
      mobile_number:['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      emp_key:[''],
      target:[''],
      start_date:[''],
      designation_id:['',[Validators.required]],
      role_id:['',[Validators.required]],
      reporting_to_ids:['',[Validators.required]],
      level_of_program_id:['',[Validators.required]],
      department_id:[''],
      password:[''],
      created_by:['',[Validators.required]]
    });
    this.getAllDepartment()
    this.getAllLevel()
    this.getAllRole()
    this.getAllUser()
    this.getDesignation()
    this.getUserbyId()

  }
 
  checkValidity(control: AbstractControl | null) {
    this.entered = !!control?.value && control?.valid;
  }
  
 
  get f() {
    return this.editForm.controls;
  }
date(event: MatDatepickerInputEvent<Date>){
  console.log(event.value);
  this.editForm.patchValue({start_date:this.datePipe.transform(event.value,'yyyy-MM-dd')})
  console.log(event.value);

}
onChange(event:any){
  console.log(event.checked);
  this.is_allow_for_app=event.checked
  
}
getUserbyId(){
  this.api.getUserById(this.id).subscribe(
    (resp:any)=>{
      this.user_details=resp.result[0]
      resp.result[0].reporting_to_ids.forEach((element:any) => {
        console.log(element);
        this.selectedArray.push(element.id)
      });
      console.log(this.selectedArray,"array");
      
      this.editForm.patchValue({first_name:resp.result[0].first_name})
      this.editForm.patchValue({last_name:resp.result[0].last_name})
      this.editForm.patchValue({email:resp.result[0].email})
      this.editForm.patchValue({mobile_number:resp.result[0].mobile_number})
      this.editForm.patchValue({emp_key:resp.result[0].emp_key})
      this.editForm.patchValue({target:resp.result[0].target})
      this.editForm.patchValue({start_date:resp.result[0].start_date})
      this.editForm.patchValue({designation_id:resp.result[0].designation_id})
      this.editForm.patchValue({role_id:resp.result[0].role_id})
      this.editForm.patchValue({reporting_to_ids:this.selectedArray});
      this.editForm.patchValue({is_allow_for_app:resp.result[0].is_allow_for_app})
      this.editForm.patchValue({level_of_program_id:resp.result[0].level_of_program_id})
      this.editForm.patchValue({department_id:resp.result[0].department_id})
      this.editForm.patchValue({password:resp.result[0].password})
      this.editForm.patchValue({created_by:resp.result[0].created_by})
      console.log(this.editForm.get('reporting_to_ids')?.value,"set value");
      
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
  getAllLevel(){
    this.api.getAllLevelOfProgram().subscribe(
      (resp:any)=>{
        this.allLevel=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getAllRole(){
    this.api.getAllRole().subscribe(
      (resp:any)=>{
        this.allRole=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getAllUser(){
    this.api.getAllUser().subscribe(
      (resp:any)=>{
        this.allUser=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getDesignation(){
    this.api.getAllDesignation().subscribe(
      (resp:any)=>{
        this.allDesignation=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  

  openFileInput(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  handleFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
        console.log(this.selectedImage,"SELECTED IMG")
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
  openDisableChat(name:string){
    const dialogRef = this.dialog.open(DisableChatComponent, {
      width:'35%',
      data: {name:name}
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openResetPassword(userdata:any){
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '40%',
      data: { userdata: userdata }
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
 
  async submit(){
    if(this.editForm.invalid){
      this.editForm.markAllAsTouched()
    }
    else{
      var array:any=[]
      console.log(this.editForm.get('reporting_to_ids')?.value);
      
      await this.allUser.forEach((element:any) => {
        if(this.editForm.get('reporting_to_ids')?.value.find((item:any)=> item===element.id)){
          console.log(element);
         array.push(element)
        }
      });
      this.editForm.patchValue({reporting_to_ids:array})
      this.api.editUser(this.id,this.editForm.value).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
          this.api.showSuccess(resp.message)
        },
        (error:any)=>{
          console.log(error);
          this.api.showError(error.error.message)
        }
      )
    }
    }
  
 
}
