import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-edit-leadlist-permissions',
  templateUrl: './edit-leadlist-permissions.component.html',
  styleUrls: ['./edit-leadlist-permissions.component.css']
})
export class EditLeadlistPermissionsComponent implements OnInit {

  editForm!: FormGroup;
  user_id: any;
  id: any;

  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<EditLeadlistPermissionsComponent>,
    private emit: EmitService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public _id: any
  ) {
    this.user_id = localStorage.getItem('user_id');
    this.id=localStorage.getItem('id');
    console.log(this.id)
   
  }

  ngOnInit(): void {

    
    this.editForm=this._fb.group({
      edit_lead:['',[Validators.required]],
      view_history:['',[Validators.required]],
      add_followup:['',[Validators.required]],
      add_note:['',[Validators.required]],
      delete_lead:['',[Validators.required]],
      payment_details:['',[Validators.required]],
      download_leads:['',[Validators.required]],
      
      email:['',[Validators.required]],
      whatsapp:['',[Validators.required]],
      sms:['',[Validators.required]]


    });
    this.getLeadListPermissionsById();
    
  }
  get f() {
    return this.editForm.controls;
  }

getLeadListPermissionsById(){
  this.api.getLeadListPermissions(this.id).subscribe((res:any)=>{
    console.log(res,"res")
    this.editForm.patchValue({edit_lead:res.results[0].lead_list_sett[0].edit_lead})
    this.editForm.patchValue({view_history:res.results[0].lead_list_sett[0].view_history})
    this.editForm.patchValue({add_followup:res.results[0].lead_list_sett[0].add_followup})
    this.editForm.patchValue({add_note:res.results[0].lead_list_sett[0].add_note})
    this.editForm.patchValue({delete_lead:res.results[0].lead_list_sett[0].delete_lead})
    this.editForm.patchValue({payment_details:res.results[0].lead_list_sett[0].payment_details})
    this.editForm.patchValue({download_leads:res.results[0].lead_list_sett[0].download_leads})
    this.editForm.patchValue({email:res.results[0].lead_list_sett[0].email})
    this.editForm.patchValue({whatsapp:res.results[0].lead_list_sett[0].whatsapp})
    this.editForm.patchValue({sms:res.results[0].lead_list_sett[0].sms})
  },(error:any)=>{
    console.log(error);
    this.api.showError(error.error.message);
  })
}

edit(){
    this.api.updateLeadListPermissions(this.id,this.editForm.value).subscribe(
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
