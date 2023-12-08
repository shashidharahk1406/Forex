import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { EditAdvanceSettingsPermissionsComponent } from '../edit-advance-settings-permissions/edit-advance-settings-permissions.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  checked:boolean=false;
  constructor(private _fb:FormBuilder,private api:ApiService,private emit:EmitService,private route:ActivatedRoute,private dialog: MatDialog){
  this.id=this.route.snapshot.paramMap.get('id');
  this.user_id=localStorage.getItem('user_id')
  localStorage.setItem('id',this.id);
  console.log(this.id,"idddddddddd")
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
  }

  advancedSettingsById(){
    this.api.getAdvanceSettingsPermissions(this.id).subscribe((res:any)=>{
      console.log(res,"responseeeeeeeeeee");
      this.allPermissions=res.results[0].adv_sett[0];
      console.log(this.allPermissions,"perrrrr")
    })
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditAdvanceSettingsPermissionsComponent, {
      width:'55%',
      data:id
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }

}
