import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';


@Component({
  selector: 'app-pause-user',
  templateUrl: './pause-user.component.html',
  styleUrls: ['./pause-user.component.css']
})
export class PauseUserComponent implements OnInit {
id:any;
editForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PauseUserComponent>,private api:ApiService, private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) {
    this.id=data
   }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.editForm = this.fb.group({
      pause:[],
      
    });}
    async submit(data:any){
      if(this.editForm.invalid){
        this.editForm.markAllAsTouched()
      }
        this.editForm.patchValue({pause:data})
        this.api.pauseUser(this.id,this.editForm.value).subscribe(
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


