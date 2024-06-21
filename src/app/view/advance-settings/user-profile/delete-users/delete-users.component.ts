import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { ReferLeadComponent } from 'src/app/view/lead-list/lead-layout/refer-lead/refer-lead.component';
import { TransferLeadsComponent } from '../transfer-leads/transfer-leads.component';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent implements OnInit {

  url:any;
  id:any;
  user_name:any;
  // disableClose:boolean=true
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<any>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public data: any, private router:Router,private dialog:MatDialog) {
      this.url=data.apiUrl;
      this.id=data.id;
      this.user_name=data.user_name
      // console.log(this.url,"data from pc");
      // console.log(this.user_name,"name in delete");
      // this.url=data
      console.log(data,"data from user-profile component");
      
      
      // this.id=id
     
     }
  ngOnInit(): void {
  }
  delete(){
   //console.log(this.url,"URL")
   
   
   this.referLead()

//   this.api.delete(this.url).subscribe(
//     (resp:any)=>{
//       this.emit.sendRefresh(true)
//       this.dialogRef.close()
//       this.api.showSuccess(this.api.toTitleCase(resp.message))
//     },
//     (error:any)=>{
//       //console.log(error);
//        this.api.showError(this.api.toTitleCase(error.error.message))
//     }
//   )
// }
   
    // 
  }


  deleteUsers(){
    this.api.delete(this.url).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
          this.api.showSuccess(this.api.toTitleCase(resp.message))
        },
        (error:any)=>{
          //console.log(error);
           this.api.showError(this.api.toTitleCase(error.error.message))
        }
      )
  }

  referLead(){
    const dialogRef = this.dialog.open(TransferLeadsComponent, {
      width:'40%',
      data:{data:this.data,callback:this.deleteUsers.bind(this)}
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
  }


}
