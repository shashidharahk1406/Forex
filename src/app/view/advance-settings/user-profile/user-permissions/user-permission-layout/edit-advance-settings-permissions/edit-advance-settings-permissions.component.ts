import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';


@Component({
  selector: 'app-edit-advance-settings-permissions',
  templateUrl: './edit-advance-settings-permissions.component.html',
  styleUrls: ['./edit-advance-settings-permissions.component.css'],
})
export class EditAdvanceSettingsPermissionsComponent implements OnInit {
 

  editForm!: FormGroup;
  user_id: any;
  id: any;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<EditAdvanceSettingsPermissionsComponent>,
    private emit: EmitService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public _id: any
  ) {
    this.user_id = localStorage.getItem('user_id');
    this.id=localStorage.getItem('id');
    //console.log(this.id)
   
  }

  ngOnInit(): void {

    
    this.editForm=this._fb.group({
      dropdown_values:['',[Validators.required]],
      status:['',[Validators.required]],
      sources_and_channels:['',[Validators.required]],
      courses:['',[Validators.required]],
      demographics:['',[Validators.required]],
      priorities:['',[Validators.required]],
      user_and_roles:['',[Validators.required]],
      adv_comm_sett:['',[Validators.required]],
      whatsp_temp_sett:['',[Validators.required]],
      email_temp_sett:['',[Validators.required]],
      sms_temp_sett:['',[Validators.required]],
      user_add:['',[Validators.required]],
      user_status:['',[Validators.required]],
      res_pause_user:['',[Validators.required]],
      repl_user:['',[Validators.required]],
      reset_pass:['',[Validators.required]],
      chat_dis_enab:['',[Validators.required]],
      del_user:['',[Validators.required]],
      user_perm:['',[Validators.required]],
    


    });
    this.getAsettingsById();
    
  }
  get f() {
    return this.editForm.controls;
  }

getAsettingsById(){
  this.api.getAdvanceSettingsPermissions(this.id).subscribe((res:any)=>{
    //console.log(res,"res")
    this.editForm.patchValue({dropdown_values:res.results[0].adv_sett[0].dropdown_values})
    this.editForm.patchValue({status:res.results[0].adv_sett[0].status})
    this.editForm.patchValue({sources_and_channels:res.results[0].adv_sett[0].sources_and_channels})
    this.editForm.patchValue({courses:res.results[0].adv_sett[0].courses})
    this.editForm.patchValue({demographics:res.results[0].adv_sett[0].demographics})
    this.editForm.patchValue({priorities:res.results[0].adv_sett[0].priorities})
    this.editForm.patchValue({user_and_roles:res.results[0].adv_sett[0].user_and_roles})
    this.editForm.patchValue({adv_comm_sett:res.results[0].adv_sett[0].adv_comm_sett})
    this.editForm.patchValue({whatsp_temp_sett:res.results[0].adv_sett[0].whatsp_temp_sett})
    this.editForm.patchValue({email_temp_sett:res.results[0].adv_sett[0].email_temp_sett})
    this.editForm.patchValue({sms_temp_sett:res.results[0].adv_sett[0].sms_temp_sett})
    this.editForm.patchValue({user_add:res.results[0].adv_sett[0].user_add})
    this.editForm.patchValue({user_status:res.results[0].adv_sett[0].user_status})
    this.editForm.patchValue({res_pause_user:res.results[0].adv_sett[0].res_pause_user})
    this.editForm.patchValue({repl_user:res.results[0].adv_sett[0].repl_user})
    this.editForm.patchValue({reset_pass:res.results[0].adv_sett[0].reset_pass})
    this.editForm.patchValue({chat_dis_enab:res.results[0].adv_sett[0].chat_dis_enab})
    this.editForm.patchValue({del_user:res.results[0].adv_sett[0].del_user})
    this.editForm.patchValue({user_perm:res.results[0].adv_sett[0].user_perm})
    
  },(error:any)=>{
    //console.log(error);
    this.api.showError(error.error.message)
  })
}

edit(){
    this.api.updateAdvanceSettingsPermissions(this.id,this.editForm.value).subscribe(
      (resp:any)=>{
        //console.log(resp,"update user permissions")
        this.emit.sendRefresh(true)
        this.dialogRef.close()
        this.api.showSuccess(resp.message)
      },
      (error:any)=>{
        //console.log(error);
        this.api.showError(error.error.message)
      }
    )
  

}

}
