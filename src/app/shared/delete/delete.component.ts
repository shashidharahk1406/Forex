import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  url:any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<DeleteComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _url: any) {
      this.url=_url
      
     }
  ngOnInit(): void {
  }
  delete(){

    this.api.delete(this.url).subscribe(
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
