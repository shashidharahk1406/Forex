import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-whatsapp-view-template',
  templateUrl: './whatsapp-view-template.component.html',
  styleUrls: ['./whatsapp-view-template.component.css']
})
export class WhatsappViewTemplateComponent implements OnInit {
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
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<WhatsappViewTemplateComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      name: [''],
      message: ['',[Validators.required]],
      template_category_id: ['',[Validators.required]],
      language_id: [null],
      // template_category_id: ['',[Validators.required]],  

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
        //console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({name:resp.result[0].name})
        this.editForm.patchValue({message:resp.result[0].message})
        this.editForm.patchValue({template_category_id:resp.result[0].template_category_id})


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
    //console.log(this.message);
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
          //console.log("error");
          
        }
      )
    }

  }
  
}
