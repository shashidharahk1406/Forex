import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-whatsapp-filter',
  templateUrl: './whatsapp-filter.component.html',
  styleUrls: ['./whatsapp-filter.component.css']
})
export class WhatsappFilterComponent implements OnInit {
  filterUser!:FormGroup;
  status: any = ['True','False'];

  constructor(
    public dialogRef: MatDialogRef<WhatsappFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder, private datePipe:DatePipe, private emit:EmitService
   ) {
  }

  ngOnInit(): void {
    this.initForm()
  }
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
 initForm(){
  this.filterUser = this.fb.group({
    template_category_id: [''],
    status: [''],
    // createdBy: [''],
    // updatedBy: [''],
    from_date: [''],
    to_date: [''],
    from_updated_date: [''],
    to_updated_date: [''],
    
  });
  this.setValue();

 }
 setValue(){
  var data:any=localStorage.getItem('whatsappFilter')
  var resp:any= JSON.parse(data)
  if(resp){
    
    this.filterUser.patchValue({template_category_id:resp?.template_category_id})
    this.filterUser.patchValue({status:resp?.status})
    this.filterUser.patchValue({from_date:resp?.from_date})
    this.filterUser.patchValue({to_date:resp?.to_date})
    this.filterUser.patchValue({from_updated_date:resp?.from_updated_date})
    this.filterUser.patchValue({to_updated_date:resp?.to_updated_date})

  }

}
 createdFromDate(event_from: MatDatepickerInputEvent<Date>,dateType:any) {
  if(dateType=="creationFrom"){
    this.filterUser.patchValue({from_date:this.datePipe.transform(event_from.value,"yyyy-MM-dd")})
  }
  else if(dateType=="creationTo"){
    this.filterUser.patchValue({to_date:this.datePipe.transform(event_from.value,"yyyy-MM-dd")}) 
  }
  else if(dateType=="updateFrom"){
    this.filterUser.patchValue({from_updated_date:this.datePipe.transform(event_from.value,"yyyy-MM-dd")}) 
  }
  else if(dateType=="updateTo"){
    this.filterUser.patchValue({to_updated_date:this.datePipe.transform(event_from.value,"yyyy-MM-dd")}) 
  }
}
async submit(){
  const formValues = this.filterUser.value;

  // Create an array of query parameters with non-empty values
  const queryParams = [];
  for (const key in formValues) {
    const value = formValues[key];
    if (value !== '' && value !== undefined) {
      if (Array.isArray(value)) {
        // Handle multi-select fields
        if (value.length > 0) {
          // Convert array of objects to a comma-separated string of IDs
          if (key === 'reporting_to_ids') {
            const ids = value.map((item) => item).join(',');
            queryParams.push(`${key}=[${ids}]`);
          } else {
            const values = value.join(',');
            queryParams.push(`${key}=${values}`);
          }
        }
      } else {
        queryParams.push(`${key}=${value}`);
      }
    }
  }


  var apiUrl = `${queryParams.join('&')}`;
  //console.log(this.filterUser.value);
  localStorage.setItem('whatsappFilter',JSON.stringify(this.filterUser.value))


    this.emit.sendRefreshbyFilter(apiUrl)
    this.dialogRef.close()


}
reset(){
  localStorage.removeItem('whatsappFilter')
  this.emit.sendRefreshbyFilter(null)

  this.dialogRef.close()
}
}
