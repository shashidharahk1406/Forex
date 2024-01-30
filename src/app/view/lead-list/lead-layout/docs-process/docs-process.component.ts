import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmissionDetailsComponent } from '../admission-details/admission-details.component';

@Component({
  selector: 'app-docs-process',
  templateUrl: './docs-process.component.html',
  styleUrls: ['./docs-process.component.css']
})
export class DocsProcessComponent implements OnInit {
  docsProcess!:FormGroup;
  docStatus:any = [
    {
      id:1,
      status:'Completed'
    },
    {
      id:2,
      status:'Pending if any'
    },
   ]
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AdmissionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.docsProcess = this.fb.group({
      docsStatus:['',Validators.required],
      pendingDocs:['']
    })
  }
  get f() {
    return this.docsProcess.controls;
  }
  onSubmit(){}
  closePopup(){
    this.dialogRef.close()
  }
  clearSelectField(fieldName: string) {
    this.docsProcess.get(fieldName)?.reset();
}
  onFileSelected(event:any){}

}
