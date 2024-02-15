import { Component, OnInit, Input, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetConfig,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { ApiService } from 'src/app/service/API/api.service';
import { MyFollowupFilterComponent } from '../../my-followup-filter/my-followup-filter.component';

import moment from 'moment';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { EditFollowupComponent } from '../../edit-followup/edit-followup.component';
import { CalenderModalComponent } from '../../calender-modal/calender-modal.component';
import { DatePipe } from '@angular/common';
import { error } from 'console';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-my-followup-card-content',
  templateUrl: './my-followup-card-content.component.html',
  styleUrls: ['./my-followup-card-content.component.css'],
})
export class MyFollowupCardContentComponent implements OnInit {
  selectedDate: any=null;
  @ViewChild(DaterangepickerDirective, { static: false })
  @Output()selectedSort = new EventEmitter()
  pickerDirective!: DaterangepickerDirective;
  @Input() leadData: any;
  expandPanel : boolean=false;
  morePanel: boolean = false;
  expandedCardIndex: number = -1;
  selected: any;
  alwaysShowCalendars!: boolean;
  keepCalendarOpeningWithRange: any;
  counsellor_id: any;
  page = 1;
  pageSize = 5;
  follow_up_status: any;
  followUpsData: any = [];
  upcomingFollowUpData: any = [];
  missedFolloUpData: any = [];
  doneFollowUpData: any = [];
  allFollowUpDataSource: any;
  totalNumberOfRecords: any;
  searchTerm: string = '';
  // @Output()selectedSort = new EventEmitter()
  // @ViewChild("fullcalendar", { static: true })

  allData = []; //Store all data from provider
  filterData = []; //Store filtered data
  selectedCheckboxIds: any;
  totalCount: any;
  checkAll: boolean = false;
  role: any;
  selectedTab:any='All'
  query!: string;
  // @ViewChild('allPaginator') allPaginator!: MatPaginator;
  constructor(
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private api: ApiService,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private datePipe: DatePipe,
    private emit:EmitService,
    private _baseService:BaseServiceService
  ) {
    this.alwaysShowCalendars = true;
    this.counsellor_id = localStorage.getItem('user_id');
    console.log(this.counsellor_id, 'counsellor id');
    this.role = localStorage.getItem('user_role');
    console.log(this.role, 'roleeeeeeeeeeeeeee');
  }

  ngOnInit(): void {
    // this.getUpcoming();
    // this.followUpCounts();
    this.getAllFollowUps('All');
    this.getUpcoming('Upcoming');
    this.getMissed('Missed');
    this.getDone('Done');

    // this.selectedDate = null || undefined;
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getAllFollowUps('All'); 
          this.getDone('Done');
          this.getMissed('Missed');
          this.getUpcoming('Upcoming')
        }
      }
    )
    // console.log(this.selectedDate, 'this.selectedDate');
  }


  expandCard(index: number) {
    if (this.expandedCardIndex === index) {
      this.expandedCardIndex = -1;
    } else {
      this.expandedCardIndex = index;
    }
  }
  openMorePanel() {
    this.morePanel = !this.morePanel
  }

  openCall(name: string) {
    // const dialogRef = this.dialog.open(RawDataCallComponent, {
    //   width:'30%',
    //   data: {name:name}
    // });
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  openSMS(name: any): void {
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(RawDataSmsComponent,config);
  }
  openWhatsAppChat() {
    // const dialogRef = this.dialog.open(RawDataWhatsappchatComponent, {
    //   width:'45%',
    // });
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  openEmailChat(name: any) {
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(RawDataEmailComponent,config);
  }
  openVideoCall() {
    // const dialogRef = this.dialog.open(RawDataVideoCallComponent, {
    //   width:'45%',
    // });
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  openViewAll(name: any) {
    // const dialogRef = this.dialog.open(RawDataViewAllComponent, {
    //   width:'60%',
    //   data: {name:name}
    // });
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  editLead(name: any) {
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(LeadEditComponent,config);
  }
  formattedDate1!: any;
  selectedDatePicker(event: any) {
    this.countData = [];
    this.followUpsData = [];
    console.log(event);
    this.selectedDate = event;

    if (this.role == 'Admin') {
      this.countData = [];
      this.formattedDate1 = this.datePipe.transform(
        this.selectedDate,
        'yyyy-MM-dd'
      );

      this.api.getFollowupCalenderCountsForAdmin(this.formattedDate1).subscribe(
        (res: any) => {
          console.log(res, 'followup conts for admin');
          this.countData = res.results;
          this.getAllFollowUps('All');

        },
        (error: any) => {
          this.api.showError(error.error.message);
        }
      );
    } else {
      this.countData = [];
      this.formattedDate1 = this.datePipe.transform(
        this.selectedDate,
        'yyyy-MM-dd'
      );
      this.api
        .followUpCountsOnCalenderForCounsellor(
          this.counsellor_id,
          this.formattedDate1
        )
        .subscribe(
          (res: any) => {
            this.countData = res.results;
            console.log(this.countData, 'followup count for counsellor');
            // this.followUpsData=res.results
          },
          (error: any) => {
            this.api.showError(error.error.message);
          }
        );
    }
  }

  AllfollowupsByDate() {
    if (this.role == 'Admin') {
      this.followUpsData = [];
      this.formattedDate1 = this.datePipe.transform(
        this.selectedDate,
        'yyyy-MM-dd'
      );
      this.api
        .getFollowUpsbyDateForAdmin(
          this.formattedDate1,
          this.page,
          this.pageSize
        )
        .subscribe(
          (res: any) => {
            console.log(res, 'followups by dateeeeeeeeeeeeeee for admin');
            this.followUpsData = res.results;
            this.totalNumberOfRecords = res.total_no_of_record;
          },
          (error: any) => {
            this.api.showError(error.error.message);
          }
        );
    } else {
      this.followUpsData = [];
      this.api
        .getAllFollowupsByDateForCounsellor(
          this.formattedDate1,
          this.page,
          this.pageSize,
          this.counsellor_id
        )
        .subscribe(
          (res: any) => {
            console.log(res, 'all followups by date for counsellor');
            this.followUpsData = res.results;
            this.totalNumberOfRecords = res.total_no_of_record;
          },
          (error: any) => {
            this.api.showError(error.error.message);
          }
        );
    }
  }
  getCalenderUpcomingFollowups() {
    if (this.role == 'Admin') {
      this.followUpsData = [];
      this.api
        .getCalenderUpcomingFollowupsForAdmin(
          this.formattedDate1,
          this.page,
          this.pageSize,
          this.selectedTab
        )
        .subscribe((res: any) => {
          console.log(res, 'calender upcoming follwups for admin');
          this.followUpsData = res.results;
          this.totalNumberOfRecords = res.total_no_of_record;
        });
    } else {
      this.followUpsData = [];
      this.api
        .getCalenderUpcomingFollowupsForCounsellor(
          this.formattedDate1,
          this.page,
          this.pageSize,
          this.counsellor_id,
          this.selectedTab
        )
        .subscribe((res: any) => {
          this.followUpsData = res.results;
          this.totalNumberOfRecords = res.total_no_of_record;
          console.log(res, 'calender upcoming followups for counsellor');
        });
    }
  }

  getCalenderDoneFollowups() {
    if (this.role == 'Admin') {
      this.followUpsData = [];
      this.api
        .getCalenderDoneFollowupsForAdmin(
          this.formattedDate1,
          this.page,
          this.pageSize,
          this.selectedTab
        )
        .subscribe((res: any) => {
          console.log(res, 'calender done follwups for admin');
          this.followUpsData = res.results;
          this.totalNumberOfRecords = res.total_no_of_record;
        });
    } else {
      this.followUpsData = [];
      this.api
        .getCalenderDoneFollowupsForCounsellor(
          this.formattedDate1,
          this.page,
          this.pageSize,
          this.counsellor_id,
          this.selectedTab
        )
        .subscribe((res: any) => {
          this.followUpsData = res.results;
          this.totalNumberOfRecords = res.total_no_of_record;
          console.log(res, 'calender done followups for counsellor');
        });
    }
  }

  getCalenderMissedFollowups() {
    if (this.role == 'Admin') {
      this.followUpsData = [];
      this.api
        .getCalenderMissedFollowupsForAdmin(
          this.formattedDate1,
          this.page,
          this.pageSize,
          this.selectedTab
        )
        .subscribe((res: any) => {
          console.log(res, 'calender Missed follwups for admin');
          this.followUpsData = res.results;
          this.totalNumberOfRecords = res.total_no_of_record;
        });
    } else {
      this.followUpsData = [];
      this.api
        .getCalenderMissedFollowupsForCounsellor(
          this.formattedDate1,
          this.page,
          this.pageSize,
          this.counsellor_id,
          this.selectedTab
        )
        .subscribe((res: any) => {
          this.followUpsData = res.results;
          this.totalNumberOfRecords = res.total_no_of_record;
          console.log(res, 'calender Missed followups for counsellor');
        });
    }
  }

  getAllFollowUps(data:any) {
    this.selectedTab=data;
    this.followUpsData = [];
    this.totalNumberOfRecords=[]
    if (this.role == 'Admin') {
      if (this.selectedDate!== null || undefined) {
        console.log(this.selectedDate == null || undefined,"!this.selectedDate == null && undefined")
        this.AllfollowupsByDate();
      } else {
        this.api.getAllFollowupsForAdmin(this.page, this.pageSize).subscribe(
          (res: any) => {
            console.log(res, 'All followups for admin');
            this.followUpsData = res.results;
            this.countData.All=res.total_no_of_record;
            this.totalNumberOfRecords = res.total_no_of_record;
            this.allFollowUpDataSource = new MatTableDataSource<any>(
              this.followUpsData
            );
          },
          (error: any) => {
            this.api.showError(error.error.message);
          }
        );
      }
    } else {
      if (this.selectedDate !== null || undefined) {
        this.AllfollowupsByDate();
      } else {
        this.followUpsData = [];
        this.totalNumberOfRecords=[]
        this.api
          .getAllFollowupsForCounsellor(
            this.page,
            this.pageSize,
            this.counsellor_id
          )
          .subscribe(
            (res: any) => {
              console.log(res, 'All followup for counsellor');
              this.followUpsData = res.results;
              this.totalNumberOfRecords = res.total_no_of_record;
              this.countData.All=res.total_no_of_record;
              this.allFollowUpDataSource = new MatTableDataSource<any>(
                this.followUpsData
              );
            },
            (error: any) => {
              this.api.showError(error.error.message);
            }
          );
      }
    }
  }

  getUpcoming(data:any) {
    console.log('before',this.pageSize)
    this.selectedTab=data
    if (this.role == 'Admin') {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderUpcomingFollowups();
      } else {
        this.followUpsData = [];
        this.totalNumberOfRecords=[]
        this.api
          .getUpcomingFollowupsForAdmin(this.page, this.pageSize,this.selectedTab)
          .subscribe(
            (res: any) => {
              console.log(res, 'upcoming followups for admin');
              this.followUpsData = res.results;
              this.totalNumberOfRecords = res.total_no_of_record;
              this.countData.Upcomming=res.total_no_of_record;
            },
            (error: any) => {
              this.api.showError(error.error.message);
            }
          );
      }
    } else {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderUpcomingFollowups();
      } else {
        this.followUpsData = [];
        this.totalNumberOfRecords=[]
        this.api
          .getUpcomingFollowUps(this.counsellor_id, this.page, this.pageSize,this.selectedTab)
          .subscribe(
            (res: any) => {
              console.log(res, 'upcoming response');
              this.upcomingFollowUpData = res.results;
              this.countData.Upcomming=res.total_no_of_record;;
              this.followUpsData = res.results;
              this.allData = res.results;

              this.allFollowUpDataSource = new MatTableDataSource<any>(
                this.followUpsData
              );
              this.totalNumberOfRecords = res.total_no_of_record;
            },
            (error: any) => {
              this.api.showError(error.error.message);
            }
          );
      }
    }
  }

  getMissed(data:any) {
    this.totalNumberOfRecords=[]
    this.selectedTab=data
    if (this.role == 'Admin') {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderMissedFollowups();
      } else {
        this.totalNumberOfRecords=[]
        this.followUpsData = [];
        this.api.getMissedFollowupsForAdmin(this.page, this.pageSize,this.selectedTab).subscribe(
          (res: any) => {
            console.log(res, 'Missed Followups for Admin');
            this.followUpsData = res.results;
            this.totalNumberOfRecords = res.total_no_of_record;
            this.countData.Missed=res.total_no_of_record;
          },
          (error: any) => {
            this.api.showError(error.error.message);
          }
        );
      }
    } else {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderMissedFollowups();
      } else {
        this.followUpsData = [];
        this.totalNumberOfRecords=[]
        this.api
          .getMissedFollowUps(this.counsellor_id, this.page, this.pageSize,this.selectedTab)
          .subscribe(
            (res: any) => {
              console.log(res, 'Missed followups response for counsellor');
              this.missedFolloUpData = res.results;
              this.followUpsData = res.results;
              this.allData = res.results;
              this.countData.Missed=res.total_no_of_record;
              this.allFollowUpDataSource = new MatTableDataSource<any>(
                this.followUpsData
              );
              this.totalNumberOfRecords = res.total_no_of_record;
              console.log(this.missedFolloUpData, 'this.missedFolloUpData');

            
            },
            (error: any) => {
              this.api.showError(error.error.message);
            }
          );
      }
    }
  }

  getDone(data:any) {
    this.selectedTab=data;
    if (this.role == 'Admin') {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderDoneFollowups();
      } else {
        this.totalNumberOfRecords=[]
        this.followUpsData = [];
        this.api
          .getDoneFollowupsForAdmin(this.page, this.pageSize,this.selectedTab)
          .subscribe((res: any) => {
            console.log(res, 'Done followups for Admin');
            this.followUpsData = res.results;
            this.countData.Done=res.total_no_of_record;;
            this.totalNumberOfRecords = res.total_no_of_record;
            this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)
          });
      }
    } else {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderDoneFollowups();
      } else {
        this.followUpsData = [];
        this.totalNumberOfRecords=[]
        this.api
          .getDoneFollowUps(this.counsellor_id, this.page, this.pageSize,this.selectedTab)
          .subscribe(
            (res: any) => {
              console.log(res, 'Done followups response');
              this.followUpsData = res.results;
              this.allData = res.results;
              this.countData.Done=res.total_no_of_record;;
              this.allFollowUpDataSource = new MatTableDataSource<any>(
                this.followUpsData
              );
              this.totalNumberOfRecords = res.total_no_of_record;
            },
            (error: any) => {
              this.api.showError(error.error.message);
            }
          );
      }
    }
  }

  filterFollowups() {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
    };
    this._bottomSheet.open(MyFollowupFilterComponent, config);
  }

  EditFollowups(id: any) {
    console.log(id, 'leadid');
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: { id: id },
    };
    this._bottomSheet.open(EditFollowupComponent, config);
  }

  onPageChange(event: any, followUpsData: any) {

    this.pageSize=event.pageSize;
    this.page=event.pageIndex + 1;
    // this.getAllFollowUps('all');
    if(this.role==='Admin'){
    this.followUpsData=[]
    this.totalNumberOfRecords=[]
    if(this.role==='Admin'){

    }
     this.api.getAllFollowupsForAdmin(this.page,this.pageSize).subscribe((res:any)=>
     {
      this.followUpsData=res.results
      this.allFollowUpDataSource = new MatTableDataSource<any>(
        this.followUpsData
      );
      this.totalNumberOfRecords = res.total_no_of_record;
     })
    }
    else{
      this.totalNumberOfRecords=[]
      this.followUpsData=[]
      this.api.getAllFollowupsForCounsellor(this.page,this.pageSize,this.counsellor_id).subscribe((res:any)=>{
      this.followUpsData=res.results;
      this.totalNumberOfRecords = res.total_no_of_record;
      this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)
      })
    }
    
    if(this.role==='Admin'){
      this.followUpsData=[]
      this.totalNumberOfRecords=[]
      this.api.getUpcomingFollowupsForAdmin(this.page,this.pageSize,this.selectedTab).subscribe((res:any)=>{
        this.followUpsData=res.results
        this.totalNumberOfRecords = res.total_no_of_record;
        console.log( this.totalNumberOfRecords," upcoming pagination totalNumberOfRecords")
        this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)
      })
    }
    else{
      this.followUpsData=[];
      this.api.getUpcomingFollowUps(this.counsellor_id,this.page,this.pageSize,this.selectedTab).subscribe((res:any)=>{
        this.followUpsData=res.results;
        this.totalNumberOfRecords = res.total_no_of_record;
        this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)
      })
    }

    if(this.role==='Admin'){
      this.followUpsData=[]
      this.api.getDoneFollowupsForAdmin(this.page,this.pageSize,this.selectedTab).subscribe((res:any)=>{
        this.followUpsData=res.results
        this.totalNumberOfRecords = res.total_no_of_record;
        this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)
      })
    }
    else{
      this.followUpsData=[];
      this.api.getDoneFollowUps(this.counsellor_id,this.page,this.pageSize,this.selectedTab).subscribe((res:any)=>{
        this.followUpsData=res.results;
        this.totalNumberOfRecords = res.total_no_of_record;
        this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)
      })
    }


    if(this.role==='Admin'){
      this.followUpsData=[]
      this.api.getMissedFollowupsForAdmin(this.page,this.pageSize,this.selectedTab).subscribe((res:any)=>{
        this.followUpsData=res.results
        this.totalNumberOfRecords = res.total_no_of_record;
        this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)
      })

    }
    else{
      this.followUpsData=[];
      this.api.getMissedFollowUps(this.counsellor_id,this.page,this.pageSize,this.selectedTab).subscribe((res:any)=>{
        this.followUpsData=res.results;
        this.totalNumberOfRecords = res.total_no_of_record;
        this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)
      })



    }
    

    


    


  }

 
  followupSearch:any=''
searchValue:any;
  applySearch(followupSearch:any){
    if(this.role=='Admin'){
      this.followUpsData=[]
      console.log(followupSearch,"search value");
      this.searchValue=followupSearch;
      console.log(this.searchValue,"search value")
      this.api.searchFollowupsForAdmin(this.followupSearch,this.page,this.pageSize).subscribe((res:any)=>{
      console.log(res,"searched followups for admin")
      this.followUpsData=res.results;
     

      },((error:any)=>{
        this.api.showError(error.error.message)
      }))
    }else{
      this.followUpsData=[]
this.api.searchFollowupsForCounsellor(this.followupSearch,this.page,this.pageSize,this.counsellor_id).subscribe((res:any)=>{
  console.log(res,"searched followups for counsellor")
  this.followUpsData=res.results
  // this.followupSearch=''
},((error:any)=>{
  this.api.showError(error.error.message)
}))
    }
    

   
  }

  search(event:any){
    console.log(event,"eventtttttttttttttt")
  }


  selectAllCheckboxes: boolean = false;

  closePopup() {
    this._bottomSheetRef.dismiss();
  }

  toggleSelection(record: any): void {
    record.selected = !record.selected;
    this.checkIfAllSelected();
  }

  selectAll(): void {
    // this.selectAllCheckboxes = !this.selectAllCheckboxes;
    this.followUpsData.forEach(
      (record: any) => (record.selected = this.selectAllCheckboxes)
    );
    console.log(this.selectAllCheckboxes, 'this.selectAllCheckboxes');
  }

  checkIfAllSelected(): void {
    this.selectAllCheckboxes = this.followUpsData.every(
      (record: any) => record.selected
    );
  }
  // openFollowUpCounts(){
  //   const dialogRef = this.dialog.open(CalenderModalComponent, {
  //     width:'35%'
  //   });

  //   dialogRef.afterClosed().subscribe((result:any) => {
  //     console.log('The dialog was closed');
  //   });
  // }

  currentdate = new Date();
  formattedDate = this.datePipe.transform(this.currentdate, 'yyyy-MM-dd');
  countData: any = [];

  followUpCounts() {
    this.api
      .followUpCountsOnCalenderForCounsellor(
        this.counsellor_id,
        this.formattedDate
      )
      .subscribe(
        (res: any) => {
          this.countData = res.results;
          console.log(this.countData, 'followups counts on date');
        },
        (error: any) => {
          this.api.showError(error.error.message);
        }
      );
  }
  selectedFollowUps:any=[]  
  exportReference:any

  calenderReset(){
    // this.selectedDate=null || undefined;
   window.location.reload();
  // this.getAllFollowUps('All')
   
    
  }

  downloadFollowUp(){

  }

  referFollowUp(){

  }


  onSearchInputChange(){
    this.getAllFollowUps('All');
  }


  clearSearch(event:any){
    console.log(event.target.value,"event value")
    if(event.target.value==''){
      this.getAllFollowUps('All')
    }
   
  }

  onChange(event:any){
    this.selectedSort.emit(event)
  }
  onSelect(event:any){
    this.selectedSort.emit(event)
  }

  sorting: boolean = false;
  sortedType:any;
  onChangeSorting(event:any){
    this.sorting=true;
    this.sortedType=event.target.innerText;
    // console.log(event.option.value,event.option.selected)
    console.log(this.sortedType,"this.sortedType");
    this.followUpsData=[]
    this.api.sortForAdmin(this.sortedType,this.page,this.pageSize).subscribe((res:any)=>{
      console.log(res,"sorted results")
      this.followUpsData=res.results;
      this.totalNumberOfRecords = res.total_no_of_record;
      this.allFollowUpDataSource=new MatTableDataSource<any>(this.followUpsData)


    },((error:any)=>{
      this.api.showSuccess(error.error.message)
    }))


  }
  refreshFollowUps(){
    this.getAllFollowUps('All');
  }
}
