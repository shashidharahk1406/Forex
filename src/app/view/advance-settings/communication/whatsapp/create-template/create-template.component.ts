import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  filterUser!:FormGroup;
  message:any
  constructor(
    public dialogRef: MatDialogRef<CreateTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder
   ) {
  }

  ngOnInit(): void {
    this.initForm()
  }
 initForm(){
  this.filterUser = this.fb.group({
    whatsappType: [''],
    templateStatus: [''],
    createdBy: [''],
    updatedBy: [''],
    creationFrom: [''],
    creationTo: [''],
    modificationFrom: [''],
    modificationTo: [''],
    
  });
 }
 editorConfig = {
  toolbarGroups: [
    { name: 'basicstyles' },
    { name: 'insert' },
  ],
  removeButtons: 'Underline,Subscript,Superscript,Anchor,Image,Table,Smiley,PageBreak,Iframe, HorizontalRule',
  extraPlugins: 'emoji',
  height: '150px',
};
handleSelectChange(event:any) {
  const selectedValue = event.value;
  const currentEditorData = this.message || '';
  this.message += `${selectedValue}`;
  // this.matSelect.value = null; // Reset MatSelect's value
  console.log(this.message);
  
}

}
