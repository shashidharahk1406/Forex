import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/service/data.service';
import { timestamp } from 'rxjs';


@Component({
  selector: 'app-lead-followup',
  templateUrl: './lead-followup.component.html',
  styleUrls: ['./lead-followup.component.css'],
})
export class LeadFollowupComponent implements OnInit {
  meridian = true;
  followupForm!: FormGroup;
  leadCategory: any = [];
  status: any = [];
  subStatus: any = [];
  followupType: any = [];
  templateList: any = [];
  basicTemplate: any;
  isRequired:boolean=false;
  // currentDate:any
 

  counsellor_id: any;
  statusId: any;
  createdBy:any
  format_date:any
  minDateTime:string
  constructor(
    private datePipe: DatePipe,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private _baseService: BaseServiceService
   
  ) {
    // this.currentDate=new Date().toISOString().slice(0, 16);

    const currentDate = new Date();
    // currentDate.setHours(9, 0, 0, 0);
    this.minDateTime = currentDate.toISOString().slice(0, 16); 
    console.log(this.minDateTime,"this.minDateTime");
    
  // const timestamp=new Date()
  //   console.log(timestamp,"timestamp");
  //   const currentDate=new Date(timestamp)
    

  //   this.format_date=this.datePipe.transform(currentDate,'yyyy-MM-ddTHH:mm')
  //   console.log(this.format_date,"format_date");
    
    this.createdBy = localStorage.getItem('user_id');
    this.initForm();
    console.log(this.data.item.user_data.first_name,"this.data.item.user")
    this.getFollowUp()




  }


  
  selectTime(ev:any){
console.log(ev.target.value);

  }
  selectedDate(event:any){
console.log(event.target.value,"selected date");
event.preventDefault()

  }

  ngOnInit(): void {
    this.dropDownValues();
    this.getLeadByID(this.data.item.user_data.id);
    // this.initForm();
    this.getPriorities();
    this.getAllFollowupStatuses()
  }

  presentDate=new Date();

  initForm() {
    this.followupForm = this.fb.group({
      follow_up_type: ['normal'],
      priority: ['', Validators.required],
      lead_status: ['', Validators.required],
      follow_up_status:['3'],
      communication_channel: ['', Validators.required],
      action_date_time: ['', Validators.required],
      follow_up_text: [''],
      counsellor: [''],
      lead: [''],
      created_by: [''],
      // modified_datetime:[''],
      created_datetime:['']
    });
  }
  getFollowUp(){
    this._baseService.getByID(`${environment.followUps}?lead_id=${this.data.item.user_data.id}`).subscribe((res:any)=>{
      if(res){
        let formData = res
      //   {
      //     "id": 52,
      //     "counsellor": "Swapna",
      //     "counsellor_id": 972,
      //     "lead": "qwerty",
      //     "lead_id": 1660,
      //     "created_by": "Swapna",
      //     "follow_up_type": "normal",
      //     "lead_status": "Hot Followups",
      //     "follow_up_status_name": "Upcoming",
      //     "age": 19,
      //     "date_of_birth": "2005-02-01",
      //     "department": null,
      //     "lead_creation_date": "2024-02-08T12:39:14.410316Z",
      //     "lead_updation_date": null,
      //     "lead_mobile_number": "3399920155",
      //     "action_date_time": "2024-02-04T11:10:00+05:30",
      //     "follow_up_text": "wrjvqweriv",
      //     "created_datetime": "2024-02-14T12:15:34.286919+05:30",
      //     "priority": 6,
      //     "communication_channel": 5,
      //     "follow_up_status": 3
      // }
      this.status.forEach((element:any) => {
        if(element.name==res.lead_status){
          this.statusId=element.id
        }
      });
      this.followupForm.patchValue({
        follow_up_type:formData.follow_up_type,
        priority: formData.priority,
        lead_status: this.statusId,
        follow_up_status:formData.follow_up_status_name,
        communication_channel:formData.communication_channel,
        action_date_time:this.datePipe.transform(formData.action_date_time,'yyyy-MM-ddTHH:mm'),
        follow_up_text: formData.follow_up_text,
        counsellor: formData.counsellor_id,
        lead: formData.lead_id,
        created_by: formData.created_by
      });
       //console.log(res.result,'RESULTS')
      }
    },((error:any)=>{
     // this.api.showError(error.error.message)
    }))
  }
    
  dropDownValues() {
    this.getSource();
    this.getStatus();
    this.getSubStatus();
    this.getChannel();
    this.getTemplate();
  }
  getSource() {
    this.api.getAllSource().subscribe(
      (res: any) => {
        if (res.results) {
          this.followupType = res.results;
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getStatus() {
    this._baseService.getData(`${environment.lead_status}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.status = res.results;
          //console.log(this.status,"this.status")
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getSubStatus() {
    this._baseService.getData(`${environment.lead_subStatus}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.subStatus = res.results;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getChannel() {
    this.api.getAllChannel().subscribe(
      (resp: any) => {
        if (resp.results) {
          this.leadCategory = resp.results;
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getTemplate() {
    this._baseService
      .getData(`${environment.whatsapp_template}`)
      .subscribe((res: any) => {
        if (res.results) {
          this.templateList = res.results;
        }
      });
  }
  closePopup() {
    this._bottomSheetRef.dismiss();
  }

  get f() {
    return this.followupForm.controls;
  }
  clearSelectField(fieldName: any) {
    console.log(fieldName,"field name")
    this.followupForm.get(fieldName)?.reset();
  }

  getLeadByID(lead_id:any = null){
    console.log("get lead by id");
    
    this._baseService.getByID(`${environment.lead_list}${lead_id}/`).subscribe(
      (res: any) => {
        console.log(res.result[0].referred_to,"getleadby id response")
        this.counsellor_id = res.result[0].referred_to
      }
    )
  }
  


 


  onSubmit() {
    // //console.log('api calling', this.data);
    this.followupForm.value.lead = this.data.item.user_data.id;
    this.followupForm.value.counsellor = Number(this.counsellor_id);
    this.followupForm.value.created_by = Number(this.createdBy);
    let update_date_time = this.datePipe.transform(this.followupForm.value.action_date_time,  'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
    // let formattedModifiedDateTime=this.datePipe.transform(this.followupForm.value.modified_datetime,'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
    
    this.followupForm.value.action_date_time = update_date_time
    // this.followupForm.value.modified_datetime=this.datePipe.transform(this.presentDate,'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ');
    this.followupForm.value.created_datetime=this.datePipe.transform(this.presentDate,'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
   

    //console.log(this.followupForm.valid, this.followupForm.value);
    if (this.followupForm.invalid) {
      // alert('api calling')
      this.followupForm.markAllAsTouched();
      // alert('api calling')
    } else {
      this._baseService
        .postData(`${environment.lead_follow_up}`, this.followupForm.value)
        .subscribe(
          (res: any) => {
            // alert('api calling');
            if (res) {
              this.api.showSuccess(res.message);
              this.closePopup();
            }
          },
          (error: any) => {
            this.api.showError(this.api.toTitleCase(error.error.message));
          }
        );
    }
  }
  selectOptionsProgrammatically() {
    const selectedValues = ['Application', 'Lead'];
    this.followupForm.patchValue({
      leadCategory: selectedValues,
    });
  }
  onChanges(item: any, template: any) {
    this.basicTemplate = '';
    if (template && item) {
      if (item.id === template) {
        this.basicTemplate = `#Hi# ${item.message} #first_name#`;
        // Check if the followupComment contains hash symbols (#)
        // Use a regular expression to identify and wrap text within hash symbols with read-only attributes
        // const modifiedValue =  this.basicTemplate.replace(/#(.*?)#/g, (match: any, content: any) => {
        //   return `<span class="non-editable" contenteditable="false">${match}</span>`;
        // });
        this.followupForm.patchValue({
          followupComment: this.basicTemplate,
        });
      }
    }
  }
  onInput(event: any) {
    //console.log(event.target.value);
    
    const textarea = event.target;
    const value = textarea.value;

    // Use a regular expression to identify and wrap text within hash symbols with read-only attributes
    // const modifiedValue = value.replace(/#(.*?)#/g, (match: any, content: any) => {

    //   return `<span class="non-editable" >${match}</span>`;
    // });
    ////console.log(modifiedValue,"debugger")
    // this.followupForm.patchValue({
    //   followupComment: modifiedValue
    // });
  }
  page = 1;
  pageSize = 10;
  prioritiesData: any = [];
  getPriorities() {
    this.api.getPriority(this.pageSize, this.page).subscribe((res: any) => {
      //console.log(res, 'priorities');
      this.prioritiesData = res.results;
    });
  }

AllFollowupStatuses:any=[]
  getAllFollowupStatuses(){
    this.api.allFollowUpStatuses().subscribe((res:any)=>{
      //console.log(res,"all follwoups")
      this.AllFollowupStatuses=res
    })
  }


  
}
