import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DataService } from 'src/app/service/data.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-followup',
  templateUrl: './edit-followup.component.html',
  styleUrls: ['./edit-followup.component.css']
})
export class EditFollowupComponent implements OnInit {
  editFollowUpForm!:FormGroup
  counsellor_id: any;
  leadCategory: any = [];
  status: any = [];
  subStatus: any = [];
  followupType: any = [];
  templateList: any = [];
  basicTemplate: any;
  // id:any
  leadId: any;
  counsellor_Id: any;
  created_by: any;
  formattedDate!: any
  statusId: any;
  createdBy:any;
  currentDate=new Date().toISOString().slice(0, -8);

  constructor( private datePipe: DatePipe,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private _baseService: BaseServiceService,
    private activateRoute:ActivatedRoute,
    private _bottomSheet:  MatBottomSheet,
    private emit:EmitService,
    private dataService:DataService,
    private cd: ChangeDetectorRef,
    private router:Router) {
       this.createdBy = localStorage.getItem('user_id');
      this.id=this.activateRoute.snapshot.paramMap.get('id')
      this.minDateTime = new Date().toISOString().slice(0, 16); 
      // this.leadId=this.data?.item.user;
      // //console.log(this.leadId,"leadid")
      //console.log(data,"dataaaaaaaaaaaaaaaa")
      // console.log(this.data.item?.user_data?.id,"this.data.item.user;")
      
     }

     selectedDateTime!: string;
  minDateTime!: string;
currentDateTime=new Date();
formattedDate3=this.datePipe.transform(this.currentDateTime,'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
  ngOnInit(): void {



    this.dataService.dataUpdated.subscribe((res:any)=>{
      console.log(res,"filtercount")
      // this.filterCount=res;
    })

    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          // this.getAllFollowUps('All'); 
          // this.getDone('Done');
          // this.getMissed('Missed');
          // this.getUpcoming('Upcoming')
        }
      }
    )
    //console.log(this.data.id,"data")
this.dropDownValues();
this.getFollowUpById()
    this.editFollowUpForm = this.fb.group({
      follow_up_type: ['normal'],
      priority: ['', Validators.required],
      lead_status: ['', Validators.required],
      follow_up_status:['',Validators.required],
      communication_channel: ['', Validators.required],
      action_date_time: ['',this.dateTimeValidator],
      follow_up_text: [''],
      counsellor: [''],
      lead: [''],
      created_by: [this.createdBy],
      modified_datetime:[this.formattedDate3],
      // created_datetime:[]
    });
  }


  dateTimeValidator(control:any) {
    const selectedDateTime = new Date(control.value);
    const now = new Date();
    return selectedDateTime > now ? null : { pastDateTime: true };
  }

hideFollowupStatus:boolean=false;
  getLeadByID(lead_id:any = null){
    console.log("get lead by id");
    
    this._baseService.getByID(`${environment.lead_list}${lead_id}/`).subscribe(
      (res: any) => {
        console.log(res.result[0].referred_to,"getleadby id response")
        this.counsellor_id = res.result[0].referred_to;
        
      }
    ) 
  }
  get f() {
    return this.editFollowUpForm.controls;
  }
  clearSelectField(fieldName: string) {
    this.editFollowUpForm.get(fieldName)?.reset();
  }
  

  dropDownValues() {
    this.getSource();
    this.getStatus();
    this.getSubStatus();
    this.getChannel();
    this.getTemplate();
    this.getPriorities();
    this.getAllFollowupStatuses()
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
      console.log(res,"all folloups")
     
      this.AllFollowupStatuses=res
    })
  }




  edit() {
    // console.log('api calling', this.data);
    this.editFollowUpForm.patchValue({counsellor:this.counsellor_Id})
    this.editFollowUpForm.patchValue({lead:this.leadId})
    this.editFollowUpForm.patchValue({created_by:this.createdBy})
    let update_date_time = this.datePipe.transform(this.editFollowUpForm.value.action_date_time,  'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
    
    this.editFollowUpForm.value.action_date_time = update_date_time
   

    //console.log(this.editFollowUpForm.valid, this.editFollowUpForm.value);
    if (this.editFollowUpForm.invalid) {
     
      this.editFollowUpForm.markAllAsTouched();
      
    } else {
      this.api.updateLeadFollowUp(this.id,this.editFollowUpForm.value)
        .subscribe(
          (res: any) => {
            // alert('api calling');
            if (res) {
              this.api.showSuccess(res.message);
              this.dataService.sendData(true)
              
            
              this.closePopup();
            }
          },
          (error: any) => {
            this.api.showError(this.api.toTitleCase(error.error.message));
          }
        );
    }
  }
id:any;
leadName:any;
individualData:any=[]
  getFollowUpById(){{
    
    this.api.getFollowUpByLeadId(this.data.id).subscribe((res:any)=>{
      console.log(res,"get by id");
      this.individualData[0]=res;
      console.log(this.individualData,"this.individualData")
      this.individualData?.forEach((element:any) => {
        console.log(element.follow_up_status,"fssssssssss")
        if(element.follow_up_status==1 || element.follow_up_status==2){
          this.hideFollowupStatus=false
        }
        else{
          this.hideFollowupStatus=true
        }
      });
    
//console.log(res,"getbyid");
this.id=res.id;
this.leadName=res.lead
this.leadId=res.lead_id;
console.log(this.leadId,"this.leadId")
this.counsellor_Id=res.counsellor_id
console.log(this.counsellor_Id,"this.counsellor_Id")
this.created_by=res.counsellor_id
//console.log(this.created_by,"this.created_by")
//console.log(res.priority,"priority")
//console.log(res.lead_status,"lead status")
this.status.forEach((element:any) => {
  if(element.name==res.lead_status){
    this.statusId=element.id
  }
});
this.formattedDate=this.datePipe.transform(res.action_date_time,'yyyy-MM-ddTHH:mm')
//console.log('formattedDate',this.formattedDate)
this.editFollowUpForm.patchValue({priority:res.priority})
this.editFollowUpForm.patchValue({lead_status:this.statusId})
this.editFollowUpForm.patchValue({follow_up_status:res.follow_up_status})
this.editFollowUpForm.patchValue({communication_channel:res.communication_channel})
this.editFollowUpForm.patchValue({action_date_time:this.formattedDate})
this.editFollowUpForm.patchValue({follow_up_text:res.follow_up_text})



    })
    
  }
}

onKeyPress(event: KeyboardEvent) {
  event.preventDefault();
  // You can add further handling if needed
}





}