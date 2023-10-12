import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent implements OnInit {

  editForm!:FormGroup;
  allPlaceHolder:any=[]
  id:any;
  message:any
  allType:any=[
    {
      id:1,
      name:'Enterprises'
    },
    {
      id:2,
      name:'Non-Enterprises'
    }
  ]
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditTemplateComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      name: ['',[Validators.required]],
      message: ['',[Validators.required]],
      template_category_id: [2,[Validators.required]],
      language_id: [null],
      template_type_id: ['',[Validators.required]],  

    })
    this.getWhatsAppTemplateById()
  this.getPlaceHolder();

  }
  get f() {
    return this.editForm.controls;
  }
  getPlaceHolder(){
    this.api.getPlaceHolder().subscribe(
      (resp:any)=>{
        this.allPlaceHolder=resp.results
      },
      (error:any)=>{
  
      }
      
    )
  }
  getWhatsAppTemplateById(){
    this.api.getWhatsappTemplateById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({name:resp.result[0].name})
        this.editForm.patchValue({message:resp.result[0].message})
        this.editForm.patchValue({template_type_id:resp.result[0].template_type_id})


      },
      (error:any)=>{

      }
    )
  }
  handleSelectChange(event:any) {
    const selectedValue = event.value;
    const currentEditorData = this.message || '';
    this.message =currentEditorData+ `${selectedValue}`;
    // this.matSelect.value = null; // Reset MatSelect's value
    console.log(this.message);
  }
  submit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editWhatsappTemplate(this.id,this.editForm.value).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
        },
        (error:any)=>{
          console.log("error");
          
        }
      )
    }

  }
}
