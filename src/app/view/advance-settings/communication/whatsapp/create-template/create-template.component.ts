import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  whatsappTemplate!:FormGroup;
  message:any
  allPlaceHolder:any=[]
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
  constructor(
    public dialogRef: MatDialogRef<CreateTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,private api:ApiService, private emit:EmitService) {
  }

  ngOnInit(): void {
    this.initForm()
  }
 initForm(){
  this.whatsappTemplate = this.fb.group({
    name: ['',[Validators.required]],
    message: ['',[Validators.required]],
    template_category_id: ['',[Validators.required]],
    template_type_id: [1],
  });
  this.getPlaceHolder()

 }
//  editorConfig = {
//   toolbarGroups: [
//     { name: 'basicstyles' },
//     { name: 'insert' },
//   ],
//   removeButtons: 'Underline,Subscript,Superscript,Anchor,Image,Table,Smiley,PageBreak,Iframe, HorizontalRule',
//   extraPlugins: 'emoji',
//   height: '150px',
// };
handleSelectChange(event:any) {
  const selectedValue = event.value;
  const currentEditorData = this.message || '';
  this.message =currentEditorData+ `${selectedValue}`;
  // this.matSelect.value = null; // Reset MatSelect's value
  //console.log(this.message);
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
 
get f() {
  return this.whatsappTemplate.controls;
}

submit(){
 
  //console.log(this.whatsappTemplate.value);
  
  if(this.whatsappTemplate.invalid){
    this.whatsappTemplate.markAllAsTouched()

  }
  else{
    this.api.postWhatsappTemplate(this.whatsappTemplate.value).subscribe(
      (resp:any)=>{
        this.api.showSuccess(resp.message)
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
