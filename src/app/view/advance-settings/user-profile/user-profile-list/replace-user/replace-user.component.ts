import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DisableChatComponent } from '../disable-chat/disable-chat.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-replace-user',
  templateUrl: './replace-user.component.html',
  styleUrls: ['./replace-user.component.css']
})
export class ReplaceUserComponent implements OnInit {
 
  selectedImage:any;
  nameValidation: any;
  mobileNumberValidation: any;
  entered = false;
  constructor(
    public dialogRef: MatDialogRef<ReplaceUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public validationService: CommonServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }
  users: string[] = ['User 1', 'User 2', 'User 3'];
  levels: string[] = ['Level 1', 'Level 2', 'Level 3'];
  departments: string[] = ['Department 1', 'Department 2', 'Department 3'];

  replaceUserForm!: FormGroup;

  initForm(){
    this.replaceUserForm = this.fb.group({
      firstName: ['', [Validators.required,this.validationService.nameValidator()]],
      lastName: ['',[this.validationService.nameValidator()]],
      mobileNumber: ['',[this.validationService.mobileNumberValidator()]],
      employeeKey: [''],
      target: [''],
      startDate: [''],
      selectedUser: ['',Validators.required],
      selectedLevel: [''],
      selectedDepartment: [''],
    });
  }
 
  checkValidity(control: AbstractControl | null) {
    this.entered = !!control?.value && control?.valid;
  }
  
 
  get f(){
    return this.replaceUserForm.controls;
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
 
  submit(){
    if(this.replaceUserForm.invalid){
      this.replaceUserForm.markAllAsTouched()
    }
    else{
      alert('SUCCESS')
    }
  }
 
}
