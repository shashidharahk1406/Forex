import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { EditAdvanceSettingsPermissionsComponent } from '../edit-advance-settings-permissions/edit-advance-settings-permissions.component';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-advance-settings-control',
  templateUrl: './advance-settings-control.component.html',
  styleUrls: ['./advance-settings-control.component.css']
})
export class AdvanceSettingsControlComponent implements OnInit {

  editForm!:FormGroup;
  id:any;
  user_id:any
  allPermissions:any=[]
  leadListPermissions: any = [];
  checked:boolean=false;
  constructor(private _fb:FormBuilder,private api:ApiService,private emit:EmitService,private route:ActivatedRoute,private dialog: MatDialog,private _location:Location){
  this.id=this.route.snapshot.paramMap.get('id');
  this.user_id=localStorage.getItem('user_id')
  localStorage.setItem('id',this.id);
  //console.log(this.id,"idddddddddd")
  }
  



  ngOnInit(): void {
    this.advancedSettingsById();
   
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.advancedSettingsById();
        }
      }
    )

    // this.editForm=this._fb.group({
    //   lead_list:[{
    //     edit_lead:this.allPermissions[0],
    //     view_history:this.allPermissions[0],
    //     add_followup:[],
    //     add_note:[],
    //     delete_lead:[],
    //     payment_details:[],
    //     download_leads:[],
    //     email:[],
    //     whatsapp:[],
    //     sms:[],
    //   }],
    //   advance_settings:[{
    //     dropdown_values:[],
    //     user_and_roles:[],
    //   communications:[],
    //   }]
      
    //   // status:['',[Validators.required]],
    //   // sources_and_channels:['',[Validators.required]],
    //   // courses:['',[Validators.required]],
    //   // demographics:['',[Validators.required]],
    //   // priorities:['',[Validators.required]],
      
      
    //   // user_perm:['',[Validators.required]],
    
    


    // });
    this.getAsettingsById();
  }

  advancedSettingsById(){
    this.api.getAdvanceSettingsPermissions(this.id).subscribe((res:any)=>{
      //console.log(res,"responseeeeeeeeeee");
      this.allPermissions=res.results;
      this.leadListPermissions = res.results;
      //console.log(this.allPermissions,"perrrrr")
      //console.log( this.leadListPermissions,"leadlist  permissions")
    })
  }

 


 get f() {
    return this.editForm.controls;
  }

getAsettingsById(){
  this.api.getAdvanceSettingsPermissions(this.id).subscribe((res:any)=>{
    //console.log(res,"res")
    // this.editForm.patchValue({dropdown_values:res.results[1].children_status[0].access_status})
    // this.editForm.patchValue({user_and_roles:res.results[1].children_status[1].access_status})
    // this.editForm.patchValue({communications:res.results[1].children_status[2].access_status})
    // this.editForm.patchValue({courses:res.results[0].adv_sett[0].courses})
    // this.editForm.patchValue({demographics:res.results[0].adv_sett[0].demographics})
    // this.editForm.patchValue({priorities:res.results[0].adv_sett[0].priorities})
    // this.editForm.patchValue({user_and_roles:res.results[0].adv_sett[0].user_and_roles})
    // this.editForm.patchValue({adv_comm_sett:res.results[0].adv_sett[0].adv_comm_sett})
    // this.editForm.patchValue({whatsp_temp_sett:res.results[0].adv_sett[0].whatsp_temp_sett})
    // this.editForm.patchValue({email_temp_sett:res.results[0].adv_sett[0].email_temp_sett})
    // this.editForm.patchValue({sms_temp_sett:res.results[0].adv_sett[0].sms_temp_sett})
    // this.editForm.patchValue({user_add:res.results[0].adv_sett[0].user_add})
    // this.editForm.patchValue({user_status:res.results[0].adv_sett[0].user_status})
    // this.editForm.patchValue({res_pause_user:res.results[0].adv_sett[0].res_pause_user})
    // this.editForm.patchValue({repl_user:res.results[0].adv_sett[0].repl_user})
    // this.editForm.patchValue({reset_pass:res.results[0].adv_sett[0].reset_pass})
    // this.editForm.patchValue({chat_dis_enab:res.results[0].adv_sett[0].chat_dis_enab})
    // this.editForm.patchValue({del_user:res.results[0].adv_sett[0].del_user})
    // this.editForm.patchValue({user_perm:res.results[0].adv_sett[0].user_perm})
    
  },(error:any)=>{
    //console.log(error);
    this.api.showError(error.error.message)
  })
}

edit(){
    this.api.updateAdvanceSettingsPermissions(this.id,this.allPermissions).subscribe(
      (resp:any)=>{
        //console.log(resp,"update user permissions")
        this.emit.sendRefresh(true)
        // this.dialogRef.close()
        this.api.showSuccess(resp.message)
      },
      (error:any)=>{
        //console.log(error);
        this.api.showError(error.error.message)
      }
    )
  

}


goBack() {
  this._location.back();
}

  // openEdit(id:any){
  //   const dialogRef = this.dialog.open(EditAdvanceSettingsPermissionsComponent, {
  //     width:'55%',
  //     data:id
  //   });
  //   dialogRef.afterClosed().subscribe((result:any) => {
  //     //console.log('The dialog was closed');
  //   }); 
  // }
  updateChildrenMenuPermission(event:any,index:any,index2:any,data:any){
    //console.log("Checked Data",event?.target.checked)
    //console.log("Index Value",index)
    //console.log("Data Value",data);
    if(event.target.checked===true){
this.allPermissions[index].children_status[index2].access_status=true;
const statuscheckVal:boolean=this.allPermissions[index].children_status.some((ele:any)=>ele.access_status===true);
//console.log("statucheckVal",statuscheckVal);
if(statuscheckVal){
  this.allPermissions[index].access_status=true;
}else{
  this.allPermissions[index].access_status=false;
}
    }else{
      this.allPermissions[index].children_status[index2].access_status=false;
      const statucheckVal:boolean=this.allPermissions[index].children_status.some((ele:any)=>ele.access_status===true);
      //console.log("statucheckVal",statucheckVal);
      if(statucheckVal){
  this.allPermissions[index].access_status=true;
}else{
  this.allPermissions[index].access_status=false;
}
     
    }
    //console.log("Final Data",this.allPermissions);
  }

  updateParentMenuPermission(event:any,index:any,data:any){
    //console.log("Checked Data",event?.target.checked);
    //console.log("Index Value",index);
    //console.log("Data Value",data);
if(event.target.checked===true){
this.allPermissions[index].access_status=true;
this.allPermissions[index].children_status.forEach((ele:any) => {
  ele.access_status=true;
});
}else{
  this.allPermissions[index].access_status=false;
}  

//console.log("Final Data",this.allPermissions);
  }
}
