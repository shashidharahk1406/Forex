import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';


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
  currentDate=new Date().toISOString().slice(0, -8);

  counsellor_id: any;
  constructor(
    private datePipe: DatePipe,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private _baseService: BaseServiceService
  ) {
    this.counsellor_id = localStorage.getItem('user_id');
    console.log(this.data.item.user_data.id,"this.data.item.user;")

  }

  ngOnInit(): void {
    this.dropDownValues();
    this.initForm();
    console.log(this.data?.id?.id, 'data');
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
      modified_datetime:['']
    });
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
          console.log(this.status,"this.status")
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
  clearSelectField(fieldName: string) {
    this.followupForm.get(fieldName)?.reset();
  }
  
  onSubmit() {
    // console.log('api calling', this.data);
    this.followupForm.value.lead = this.data.item.user_data.id;
    this.followupForm.value.counsellor = Number(this.counsellor_id);
    this.followupForm.value.created_by = Number(this.counsellor_id);
    let update_date_time = this.datePipe.transform(this.followupForm.value.action_date_time,  'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
    // let formattedModifiedDateTime=this.datePipe.transform(this.followupForm.value.modified_datetime,'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
    
    this.followupForm.value.action_date_time = update_date_time
    this.followupForm.value.modified_datetime=this.datePipe.transform(this.presentDate,'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
   

    console.log(this.followupForm.valid, this.followupForm.value);
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
    console.log(event.target.value);
    
    const textarea = event.target;
    const value = textarea.value;

    // Use a regular expression to identify and wrap text within hash symbols with read-only attributes
    // const modifiedValue = value.replace(/#(.*?)#/g, (match: any, content: any) => {

    //   return `<span class="non-editable" >${match}</span>`;
    // });
    //console.log(modifiedValue,"debugger")
    // this.followupForm.patchValue({
    //   followupComment: modifiedValue
    // });
  }
  page = 1;
  pageSize = 10;
  prioritiesData: any = [];
  getPriorities() {
    this.api.getPriority(this.pageSize, this.page).subscribe((res: any) => {
      console.log(res, 'priorities');
      this.prioritiesData = res.results;
    });
  }

AllFollowupStatuses:any=[]
  getAllFollowupStatuses(){
    this.api.allFollowUpStatuses().subscribe((res:any)=>{
      console.log(res,"all follwoups")
      this.AllFollowupStatuses=res
    })
  }


  
  
}
