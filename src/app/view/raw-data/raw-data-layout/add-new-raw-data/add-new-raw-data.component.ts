import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-new-raw-data',
  templateUrl: './add-new-raw-data.component.html',
  styleUrls: ['./add-new-raw-data.component.css']
})
export class AddNewRawDataComponent implements OnInit {

  constructor(private datePipe:DatePipe,private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddNewRawDataComponent>,private emit:EmitService) { 
   
  }

  ngOnInit(): void {
   
  
  }


submit(){

        this.dialogRef.close()

}

}
