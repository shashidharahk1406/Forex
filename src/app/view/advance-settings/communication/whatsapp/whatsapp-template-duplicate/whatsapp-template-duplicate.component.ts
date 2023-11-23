import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-whatsapp-template-duplicate',
  templateUrl: './whatsapp-template-duplicate.component.html',
  styleUrls: ['./whatsapp-template-duplicate.component.css']
})
export class WhatsappTemplateDuplicateComponent implements OnInit {
  id:any;
  editForm!: FormGroup;

_data:any
  constructor(  public dialogRef: MatDialogRef<WhatsappTemplateDuplicateComponent>,private api:ApiService, private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
      this.id=data.id
      this._data=data
    }

  ngOnInit(): void {
  }
  async submit(){


      this.api.createDuplicate(this.id).subscribe(
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
