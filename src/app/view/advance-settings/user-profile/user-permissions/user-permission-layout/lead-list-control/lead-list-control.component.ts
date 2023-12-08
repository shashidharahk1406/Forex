import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { EditLeadlistPermissionsComponent } from '../edit-leadlist-permissions/edit-leadlist-permissions.component';

@Component({
  selector: 'app-lead-list-control',
  templateUrl: './lead-list-control.component.html',
  styleUrls: ['./lead-list-control.component.css']
})
export class LeadListControlComponent implements OnInit {
  id:any;
  user_id:any
  leadListPermissions:any=[]
  checked:boolean=false;
  constructor(private _fb:FormBuilder,private api:ApiService,private emit:EmitService,private route:ActivatedRoute,private dialog: MatDialog) { 
    this.id=this.route.snapshot.paramMap.get('id');
    this.user_id=localStorage.getItem('user_id')
    localStorage.setItem('id',this.id);
  }

  ngOnInit(): void {
    this.leadListPermissionsById();
   this.emit.getRefresh.subscribe((res:any)=>{
     if(res==true){
      this.leadListPermissionsById();
     }
   })
  }

  leadListPermissionsById(){
    this.api.getLeadListPermissions(this.id).subscribe((res:any)=>{
      console.log(res,"getLeadListPermissions");
      this.leadListPermissions=res.results[0].lead_list_sett[0];
    
      console.log(this.leadListPermissions,"perrrrr")
    },(error:any)=>{
      console.log(error)
    })
  }


  openEdit(id:any){
    console.log(id,"iddddddddddddd")
    const dialogRef = this.dialog.open(EditLeadlistPermissionsComponent, {
      width:'45%',
      
      data:id
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }

}
