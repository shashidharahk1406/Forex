import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  addForm!:FormGroup;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddCountryComponent>) { }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.addForm = this._fb.group({
      name:['',[Validators.required]],
      is_active:[true],
      is_system_value:[true],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postCountry(this.addForm.value).subscribe(
        (resp:any)=>{
          this.dialogRef.close()
        },
        (error:any)=>{
          console.log("error");
          
        }
      )
    }

  }
}

