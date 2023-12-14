import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-disable-chat',
  templateUrl: './disable-chat.component.html',
  styleUrls: ['./disable-chat.component.css']
})
export class DisableChatComponent implements OnInit {
  id:any;
  editForm!: FormGroup;
userData:boolean;
_data:any
  
    constructor(
      public dialogRef: MatDialogRef<DisableChatComponent>,private api:ApiService, private emit:EmitService,
      @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
    ) {
      this.id=data.id
      this.userData=data.user_management[0].disable_chat
      this._data=data
     }
  
    ngOnInit(): void {
      this.initForm()
    }
    initForm(){
      this.editForm = this.fb.group({
        disable_chat:[],
        
      });}
      async submit(data:any){
        if(this.editForm.invalid){
          this.editForm.markAllAsTouched()
        }
          this.editForm.patchValue({disable_chat:data})
          this.api.pauseUser(this.id,this.editForm.value).subscribe(
            (resp:any)=>{
              this.emit.sendRefresh(true)
              this.dialogRef.close()
              this.api.showSuccess(this.api.toTitleCase(resp.message))
            },
            (error:any)=>{
              console.log(error);
               this.api.showError(this.api.toTitleCase(error.error.message))
            }
          )
        }
        }
  
  
  
