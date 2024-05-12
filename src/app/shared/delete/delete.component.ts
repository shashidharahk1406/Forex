import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { ReferLeadComponent } from 'src/app/view/lead-list/lead-layout/refer-lead/refer-lead.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  url:any;
  id:any;
  user_name:any;
  // disableClose:boolean=true
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<DeleteComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public data: any, private router:Router,private dialog:MatDialog) {
      this.url=data.apiUrl;
      this.id=data.id;
      this.user_name=data.user_name
      console.log(this.url,"data from pc");
      console.log(this.user_name,"name in delete");
      
      
      // this.id=id
     
     }
  ngOnInit(): void {
  }
  delete(){
   //console.log(this.url,"URL")
   this.referLead()
   
    // 
  }

  referLead(){
    const dialogRef = this.dialog.open(ReferLeadComponent, {
      width:'40%',
      data:{id:this.id,callback:this.deleteUsers.bind(this),user_name:this.user_name}
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }

  deleteUsers(){
    this.api.delete(this.url).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
          // this.api.showSuccess(this.api.toTitleCase(resp.message))
        },
        (error:any)=>{
          //console.log(error);
           this.api.showError(this.api.toTitleCase(error.error.message))
        }
      )
  }

}
