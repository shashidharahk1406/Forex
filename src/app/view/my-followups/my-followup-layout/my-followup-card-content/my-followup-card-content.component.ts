import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Inject,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetConfig,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { ReferFollowupComponent } from '../refer-followup/refer-followup.component';
import { GenericCountComponent } from 'src/app/shared/generic-count/generic-count.component';
import { FollowupVideocallComponent } from '../followup-videocall/followup-videocall.component';
import { FollowupSmsComponent } from '../followup-sms/followup-sms.component';
import { FollowupWhatsappchatComponent } from '../followup-whatsappchat/followup-whatsappchat.component';
import { FollowupEmailComponent } from '../followup-email/followup-email.component';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { FollowupPaymentDetailsComponent } from '../followup-payment-details/followup-payment-details.component';
import { DataService } from 'src/app/service/data.service';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-my-followup-card-content',
  templateUrl: './my-followup-card-content.component.html',
  styleUrls: ['./my-followup-card-content.component.css'],
})
export class MyFollowupCardContentComponent implements OnInit, OnChanges,AfterViewInit {
  selectedDate: any = null;
  @ViewChild(DaterangepickerDirective, { static: false })
  @Output()
  selectedSort = new EventEmitter();
  pickerDirective!: DaterangepickerDirective;
  @Input() leadData: any;
  expandPanel: boolean = false;
  morePanel: boolean = false;
  expandedCardIndex: number = -1;
  selected: any;
  alwaysShowCalendars!: boolean;
  keepCalendarOpeningWithRange: any;
  counsellor_id: any;
  page = 1;
  pageSize = 5;
  // follow_up_status: any;
  followUpsData: any = [];
  upcomingFollowUpData: any = [];
  missedFolloUpData: any = [];
  doneFollowUpData: any = [];

  totalNumberOfRecords: any;
  searchTerm: string = '';
  followUpsDataTemp: any = [];

  allData = []; //Store all data from provider
  filterData = []; //Store filtered data
  selectedCheckboxIds: any = [];
  totalCount: any;
  checkAll: boolean = false;
  role: any;
  selectedTab: any = 'All';
  query!: string;
  followUpsData2: any;
  filtered = false;

  allFollowUpDataSource: any = new MatTableDataSource<any>([]);
  // Define paginator references for all tabs
  @ViewChild('allPaginator') allPaginator!: MatPaginator;
  // receiveFilterCount$!: Observable<any>;
  constructor(
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private api: ApiService,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private datePipe: DatePipe,
    private emit: EmitService,
    private _baseService: BaseServiceService,
    private addEventEmitter: AddLeadEmitterService,
    private dataService:DataService
  ) {
    this.alwaysShowCalendars = true;
    this.counsellor_id = localStorage.getItem('user_id');
    //console.log(this.counsellor_id, 'counsellor id');
    this.role = localStorage.getItem('user_role');
    console.log(this.role, 'roleeeeeeeeeeeeeee');
    console.log(data, 'data');
    
   
    this.dataService.data$.subscribe((data) => {
      if (data != null) {
        console.log(data)
        this.refreshFollowUps();
      }
    });
    
  }

  ngAfterViewInit() {
    this.allFollowUpDataSource = new MatTableDataSource<any>(this.followUpsData);
    console.log(this.allFollowUpDataSource,"ngAfterViewInit")
  }
  filteredBaseUrl: any;

  receiveData(): void {
    const data = this.dataService.getSharedData();
    console.log(data);
  }


  // reverseData() {
  //   // this.followUpsData.reverse();
   
  //   this.followUpsData.sort((a: any, b: any) => new Date(b.modified_datetime).getTime() - new Date(a.modified_datetime).getTime());
  //   this.followUpsDataTemp.sort((a:any,b:any)=>new Date(b.modified_datetime).getTime()- new Date(a.modified_datetime).getTime())
  // console.log(this.followUpsData,"latest one");
  // console.log(this.followUpsDataTemp,"latest one");



  // }


  // reverse(){
  //   return this.followUpsDataTemp.sort((a:any, b:any) => {
  //     return <any>new Date(b.modified_datetime) - <any>new Date(a.modified_datetime);
  //   });

  // }

  // reverseData() {
  //   return this.followUpsData.sort((a:any, b:any) => {
  //     return <any>new Date(b.modified_datetime) - <any>new Date(a.modified_datetime);
  //   });
   
  // }
  ngOnInit(): void {
// this.reverseData()
// this.reverse()
    
    this.dataService.dataUpdated.subscribe((res:any)=>{
      console.log(res,"filtercount")
      this.filterCount=res;
    })
    

    
    this.selectedCheckboxIds = [];
    this.addEventEmitter.leadFilter.subscribe((res: any) => {
      if (res) {
        this.filteredBaseUrl = res;
        this.filtered = true;
        console.log(res, 'resssssssssssssss');

        this.filterFollowUps(res);
        // res.results.forEach((element:any) => {

        //   if(element.follow_up_status_name=='Done'){
        //     this.countData=[]
        //     this.doneFollowUpCounts.push(element.follow_up_status_name)
        //     this.countData.Done=this.doneFollowUpCounts.length
        //     console.log(this.doneFollowUpCounts,"allfollowupcounts")
        //   }else if(element.follow_up_status_name=='Upcomming'){
        //     this.countData=[]
        //     this.upcomingFollowUpCounts.push(element.follow_up_status_name)
        //     this.countData.Upcomming=this.upcomingFollowUpCounts.length
        //     console.log(this.upcomingFollowUpCounts,"this.upcomingFollowUpCounts")
        //   }
        //   else{
        //     console.log('invalid')
        //   }
        // });
      }
    });
    this.addEventEmitter.leadFilterIcon.subscribe((resp: any) => {
      console.log(resp, 'RESPONSE');
      if (resp === 'true') {
        this.filtered = true;

      } else {
        this.filtered = false;
      }
    });

    this.totalCount = this.totalNumberOfRecords;
    // this.getUpcoming();
    // this.followUpCounts();

    this.getUpcoming('Upcoming');
    this.getMissed('Missed');
    this.getDone('Done');
    this.getAllFollowUps('All');

    // this.selectedDate = null || undefined;
    this.emit.getRefresh.subscribe((resp: any) => {
      if (resp == true) {
        this.getDone('Done');
        this.getMissed('Missed');
        this.getUpcoming('Upcoming');
        this.getAllFollowUps('All');
      }
    });
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
    this.morePanel = !this.morePanel;
  }



  filteredFollowUps: any = [];
  AllFollowUpCounts: any = [];
  upcomingFollowUpCounts: any = [];
  missedFollowUpCounts: any = [];
  doneFollowUpCounts: any = [];
  fitered: boolean = false;

  filterCount = []
  sub!: Subscription
  filterFollowUps(apiUrl: any) {
   

    this._baseService.getData(apiUrl).subscribe(
      (res: any) => {
       
      
        if (res) {
         
      
          console.log(res, 'filterrrrrrrrrrrrrrrrrrrrrrrrrrrr');
          this.followUpsData = [];
          this.followUpsDataTemp = [];

          this.filtered = true;
          // this.api.showSuccess(res.message)
          this.filteredFollowUps = res.results.data;
          this.followUpsData = res.results.data;
          this.followUpsDataTemp = res.results.data;

          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
          this.followUpsData.paginator = this.allPaginator;
          this.totalNumberOfRecords = res.total_no_of_record;

          this.countData.All = res.results.data_count.All;
          this.countData.Upcoming = res.results.data_count.Upcoming;
          this.countData.Missed = res.results.data_count.Missed;
          this.countData.Done = res.results.data_count.Done;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }

  formattedDate1!: any;
  selectedDatePicker(event: any) {
    this.countData = [];
    this.followUpsData = [];
    //console.log(event);
    this.selectedDate = event;

    if (this.role == 'Admin') {
      this.countData = [];
      this.formattedDate1 = this.datePipe.transform(
        this.selectedDate,
        'yyyy-MM-dd'
      );

      this.api.getFollowupCalenderCountsForAdmin(this.formattedDate1).subscribe(
        (res: any) => {
          //console.log(res, 'followup conts for admin');
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
            //console.log(this.countData, 'followup count for counsellor');
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
            this.followUpsData = res.results.data;
            this.followUpsDataTemp = res.results.data;
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
            this.followUpsData = res.results.data;
            this.followUpsDataTemp = res.results.data;
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
          this.followUpsData = res.results.data;
          this.followUpsDataTemp = res.results.data;
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
          this.followUpsData = res.results.data;
          this.followUpsDataTemp = res.results.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          //console.log(res, 'calender upcoming followups for counsellor');
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
          this.followUpsData = res.results.data;
          this.followUpsDataTemp = res.results.data;
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
          this.followUpsData = res.results.data;
          this.followUpsDataTemp = res.results.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          //console.log(res, 'calender done followups for counsellor');
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
          this.followUpsData = res.results.data;
          this.followUpsDataTemp = res.results.data;
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
          this.followUpsData = res.results.data;
          this.followUpsDataTemp = res.results.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          //console.log(res, 'calender Missed followups for counsellor');
        });
    }
  }

  getAllFollowUps(data: any) {
    this.selectedTab = data;
    this.followUpsData = [];
    this.totalNumberOfRecords = [];
    if (this.role == 'Admin') {
      if (this.selectedDate !== null || undefined) {
        console.log(
          this.selectedDate == null || undefined,
          '!this.selectedDate == null && undefined'
        );
        this.AllfollowupsByDate();
      } else {
        this.api.getAllFollowupsForAdmin(this.page, this.pageSize).subscribe(
          (res: any) => {
            this.filtered = false;
            console.log(res, 'All followups for admin');
            this.followUpsData = res.results.data;
            this.followUpsDataTemp = res.results.data;
            this.countData.All = res.results.data_count.All;
            this.totalNumberOfRecords = res.total_no_of_record;
            this.allFollowUpDataSource = new MatTableDataSource<any>(
              this.followUpsData
            );
            // this.reverseData()
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
        this.totalNumberOfRecords = [];
        this.api
          .getAllFollowupsForCounsellor(
            this.page,
            this.pageSize,
            this.counsellor_id
          )
          .subscribe(
            (res: any) => {
              console.log(res, 'All followup for counsellor');
              this.followUpsData = res.results.data;
              this.followUpsDataTemp = res.results.data;
              this.totalNumberOfRecords = res.total_no_of_record;
              this.countData.All = res.results.data_count.All;
              this.allFollowUpDataSource = new MatTableDataSource<any>(
                this.followUpsData
              );
              // this.reverseData()
            },
            (error: any) => {
              this.api.showError(error.error.message);
            }
          );
      }
    }
  }

  getUpcoming(data: any) {
    console.log('before', this.pageSize);
    this.selectedTab = data;
    if (this.role == 'Admin') {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderUpcomingFollowups();
      } else {
        this.followUpsData = [];
        this.totalNumberOfRecords = [];
        this.api
          .getUpcomingFollowupsForAdmin(
            this.page,
            this.pageSize,
            this.selectedTab
          )
          .subscribe(
            (res: any) => {
              this.filtered = false;
              console.log(res, 'upcoming followups for admin');
              this.followUpsData = res.results.data;
              this.followUpsDataTemp = res.results.data;
              this.totalNumberOfRecords = res.total_no_of_record;
              this.countData.Upcoming = res.results.data_count.Upcoming;
              // this.reverseData()
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
        this.totalNumberOfRecords = [];
        this.api
          .getUpcomingFollowUps(
            this.counsellor_id,
            this.page,
            this.pageSize,
            this.selectedTab
          )
          .subscribe(
            (res: any) => {
              //console.log(res, 'upcoming response');
              this.upcomingFollowUpData = res.results;
              this.countData.Upcoming = res.results.data_count.Upcoming;
              this.followUpsData = res.results.data;
              this.followUpsDataTemp = res.results.data;
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

  getMissed(data: any) {
    this.totalNumberOfRecords = [];
    this.selectedTab = data;
    if (this.role == 'Admin') {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderMissedFollowups();
      } else {
        this.totalNumberOfRecords = [];
        this.followUpsData = [];
        this.api
          .getMissedFollowupsForAdmin(
            this.page,
            this.pageSize,
            this.selectedTab
          )
          .subscribe(
            (res: any) => {
              console.log(res, 'Missed Followups for Admin');
              this.followUpsData = res.results.data;
              this.followUpsDataTemp = res.results.data;
              this.totalNumberOfRecords = res.total_no_of_record;
              this.countData.Missed = res.results.data_count.Missed;
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
        this.totalNumberOfRecords = [];
        this.api
          .getMissedFollowUps(
            this.counsellor_id,
            this.page,
            this.pageSize,
            this.selectedTab
          )
          .subscribe(
            (res: any) => {
              //console.log(res, 'Missed followups response for counsellor');
              this.missedFolloUpData = res.results;
              this.followUpsData = res.results.data;
              this.followUpsDataTemp = res.results.data;
              this.allData = res.results;
              this.countData.Missed = res.results.data_count.Missed;
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

  getDone(data: any) {
    this.selectedTab = data;
    if (this.role == 'Admin') {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderDoneFollowups();
      } else {
        this.totalNumberOfRecords = [];
        this.followUpsData = [];
        this.api
          .getDoneFollowupsForAdmin(this.page, this.pageSize, this.selectedTab)
          .subscribe((res: any) => {
            console.log(res, 'Done followups for Admin');
            this.followUpsData = res.results.data;
            this.countData.Done = res.results.data_count.Done;
            this.totalNumberOfRecords = res.total_no_of_record;
            this.allFollowUpDataSource = new MatTableDataSource<any>(
              this.followUpsData
            );
          });
      }
    } else {
      if (this.selectedDate !== null || undefined) {
        this.getCalenderDoneFollowups();
      } else {
        this.followUpsData = [];
        this.totalNumberOfRecords = [];
        this.api
          .getDoneFollowUps(
            this.counsellor_id,
            this.page,
            this.pageSize,
            this.selectedTab
          )
          .subscribe(
            (res: any) => {
              console.log(res, 'Done followups response');
              this.followUpsData = res.results?.data;
              this.allData = res.results;
              this.countData.Done = res.results.data.data_count.Done;
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
// receiveFilterCount:any=[]
  filterFollowups() {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      disableClose: true,
     
      
    };
    
    this._bottomSheet.open(MyFollowupFilterComponent, config);
  }

  EditFollowups(id: any) {
    //console.log(id, 'leadid');
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: { id: id, data: this.data },
      disableClose: true
     
    };
    this._bottomSheet.open(EditFollowupComponent, config);
  }

  onPageChange(event: any, followUpsData: any) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    // this.getAllFollowUps('all');
    if (this.role === 'Admin') {
      this.followUpsData = [];
      this.totalNumberOfRecords = [];
      if (this.role === 'Admin') {
      }
      this.api
        .getAllFollowupsForAdmin(this.page, this.pageSize)
        .subscribe((res: any) => {
          this.followUpsData = res.results?.data;
          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
          this.totalNumberOfRecords = res.total_no_of_record;
        });
    } else {
      this.totalNumberOfRecords = [];
      this.followUpsData = [];
      this.api
        .getAllFollowupsForCounsellor(
          this.page,
          this.pageSize,
          this.counsellor_id
        )
        .subscribe((res: any) => {
          this.followUpsData = res.results?.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
        });
    }

    if (this.role === 'Admin') {
      this.followUpsData = [];
      this.totalNumberOfRecords = [];
      this.api
        .getUpcomingFollowupsForAdmin(
          this.page,
          this.pageSize,
          this.selectedTab
        )
        .subscribe((res: any) => {
          this.followUpsData = res.results?.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          console.log(
            this.totalNumberOfRecords,
            ' upcoming pagination totalNumberOfRecords'
          );
          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
        });
    } else {
      this.followUpsData = [];
      this.followUpsDataTemp = [];
      this.api
        .getUpcomingFollowUps(
          this.counsellor_id,
          this.page,
          this.pageSize,
          this.selectedTab
        )
        .subscribe((res: any) => {
          this.followUpsData = res.results?.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
        });
    }

    if (this.role === 'Admin') {
      this.followUpsData = [];
      this.api
        .getDoneFollowupsForAdmin(this.page, this.pageSize, this.selectedTab)
        .subscribe((res: any) => {
          this.followUpsData = res.results?.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
        });
    } else {
      this.followUpsData = [];
      this.followUpsDataTemp = [];
      this.api
        .getDoneFollowUps(
          this.counsellor_id,
          this.page,
          this.pageSize,
          this.selectedTab
        )
        .subscribe((res: any) => {
          this.followUpsData = res.results?.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
        });
    }

    if (this.role === 'Admin') {
      this.followUpsData = [];
      this.api
        .getMissedFollowupsForAdmin(this.page, this.pageSize, this.selectedTab)
        .subscribe((res: any) => {
          this.followUpsData = res.results?.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
        });
    } else {
      this.followUpsData = [];
      this.followUpsDataTemp = [];
      this.api
        .getMissedFollowUps(
          this.counsellor_id,
          this.page,
          this.pageSize,
          this.selectedTab
        )
        .subscribe((res: any) => {
          this.followUpsData = res.results?.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          this.allFollowUpDataSource = new MatTableDataSource<any>(
            this.followUpsData
          );
        });
    }
  }

  filteredSearch() {
    if (this.filteredFollowUps) {
    }
  }

  followupSearch: any = '';
  searchValue: any;
  applySearch(followupSearch: any) {
    if (this.role == 'Admin') {
      // if (this.filteredFollowUps) {
      //   this.api
      //     .searchFollowupsForAdmin(
      //       this.followupSearch,
      //       this.page,
      //       this.pageSize
      //     )
      //     .subscribe((res: any) => {
      //       console.log(res, 'search in filtered followups');
      //     });
      // } else {
      //   console.log('error');
      // }
      this.followUpsData = [];
      this.followUpsDataTemp=[];
      this.countData=[]
     
      this.api
        .searchFollowupsForAdmin(followupSearch.target.value, this.page, this.pageSize)
        .subscribe(
          (res: any) => {
            console.log(res, 'searched followups for admin');
            this.followUpsData = res.results?.data;
            this.followUpsDataTemp=res.results?.data;
            this.totalNumberOfRecords = res.total_no_of_record;
            this.countData.All = res.results.data_count.All;
            this.allFollowUpDataSource = new MatTableDataSource<any>(
              this.followUpsData
            );
          },
          (error: any) => {
            this.api.showError(error.error.message);
          }
        );
    } else {
      this.followUpsData = [];
      this.api
        .searchFollowupsForCounsellor(
          followupSearch.target.value,
          this.page,
          this.pageSize,
          this.counsellor_id
        )
        .subscribe(
          (res: any) => {
            console.log(res, 'searched followups for counsellor');
            this.followUpsData = res.results?.data;
            this.followUpsDataTemp=res.results?.data; 
            this.totalNumberOfRecords = res.total_no_of_record;
            this.allFollowUpDataSource = new MatTableDataSource<any>(
              this.followUpsData
            );
            // this.followupSearch=''
          },
          (error: any) => {
            this.api.showError(error.error.message);
          }
        );
    }
  }

  search(event: any) {
    console.log(event, 'eventtttttttttttttt');
  }

  selectAllCheckboxes: boolean = false;

  closePopup() {
    this._bottomSheetRef.dismiss();
  }
  // selectedCheckBoxesId:any=[];
  allLeadIds: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['followUpsData']) {
      this.followUpsData2 = this.followUpsData;

      if (this.selectedCheckboxIds.length === this.totalCount) {
        this.checkAll = true;
        this.checkBoxData();
      } else {
        this.checkAll = false;
        this.checkBoxData();
      }
    }
  }
  onCheckboxChange(event: MatCheckboxChange, itemId: string) {
    console.log(itemId, 'itemId');
    if (event.checked) {
      // Checkbox is checked, add the item ID to the array if it's not already there
      if (!this.selectedCheckboxIds) {
        this.selectedCheckboxIds = [];
      } else if (!this.selectedCheckboxIds.includes(itemId)) {
        this.selectedCheckboxIds.push(itemId);
        if (this.selectedCheckboxIds.length === this.totalCount) {
          this.checkAll = true;
          this.checkBoxData();
        }
      } else {
        this.checkAll = false;
      }
    } else {
      // Checkbox is unchecked, remove the item ID from the array if it exists
      const index = this.selectedCheckboxIds.indexOf(itemId);
      if (index !== -1) {
        this.selectedCheckboxIds.splice(index, 1);
        this.checkAll = false;
        this.checkBoxData();
      }
    }
  }

  selectAll(event: any, data: any) {
    // console.log(event,"EVENT")
    this.checkAll = !this.checkAll;
    if (event.checked == true) {
      this.followUpsData.forEach((element: any) => {
        if (element) {
          element.checked = true;
          this.allLeadIds.push(element.lead_id);
          console.log(this.allLeadIds, 'this.allLeadIds');
        }
      });
      console.log(this.selectedCheckboxIds, 'allleaids');
      // If "Select All" is checked, add all IDs to the selectedCheckboxIds array
      this.selectedCheckboxIds = this.allLeadIds;
      console.log(this.selectedCheckboxIds, 'LEADIDS');
      this.checkBoxData();
      // this.checked = false
    } else {
      // If "Select All" is unchecked, clear the selectedCheckboxIds array

      this.followUpsData.forEach((element: any) => {
        if (element) {
          element.checked = false;
          if (element.checked == false) {
            this.selectedCheckboxIds = [];
          }
        }
      });
    }
  }

  checkBoxData() {
    for (let selectedId of this.selectedCheckboxIds) {
      const leadFollowUpItem = this.followUpsData2.find(
        (item: any) => item.lead_id === selectedId
      );
      if (leadFollowUpItem) {
        leadFollowUpItem.checked = true;
      }
    }
  }

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
          this.countData = res.results?.data.data_count;
          console.log(this.countData, 'followups counts on date');
        },
        (error: any) => {
          this.api.showError(error.error.message);
        }
      );
  }
  selectedFollowUps: any = [];
  exportReference: any;

  calenderReset() {
    this.selectedDate=null
    // window.location.reload();
    // this.getAllFollowUps('All')
    this.refreshFollowUps();
  }

  onSearchInputChange() {
    this.getAllFollowUps('All');
  }
noData:boolean=false;
@ViewChild('noResultsSection') noResultsSection:any;

  clearSearch(event: any) {
    
    this.followUpsData = this.followUpsDataTemp;
    console.log('Event', event.data);
    console.log(this.followUpsData.length,"length")
  
    
  
   
  }

  onChange(event: any) {
    this.selectedSort.emit(event);
  }
  onSelect(event: any) {
    this.selectedSort.emit(event);
  }

  sorting: boolean = false;
  sortedType: any;
  onChangeSorting(event: any) {
    this.sorting = true;
    this.sortedType = event.target.innerText;
    // console.log(event.option.value,event.option.selected)
    console.log(this.sortedType, 'this.sortedType');
    this.followUpsData = [];
    this.api.sortForAdmin(this.sortedType, this.page, this.pageSize).subscribe(
      (res: any) => {
        console.log(res, 'sorted results');
        this.followUpsData = res.results.data;
        this.totalNumberOfRecords = res.total_no_of_record;
        this.allFollowUpDataSource = new MatTableDataSource<any>(
          this.followUpsData
        );
      },
      (error: any) => {
        this.api.showSuccess(error.error.message);
      }
    );
  }
  refreshFollowUps() {
    this.getMissed('Missed');
    this.getUpcoming('Upcoming');
    this.getDone('Done');
    this.getAllFollowUps('All');
   
  }

  addCount() {
    if (this.checkAll) {
      this.data = 'All';
    } else {
      this.data = this.selectedCheckboxIds.length;
      console.log(this.selectedCheckboxIds, 'this.selectedCheckBoxesId');
    }
  }

  openReferLead() {
    const dialogRef = this.dialog.open(ReferFollowupComponent, {
      width: '40%',
      data: { leadId: this.selectedCheckboxIds },
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.refreshFollowUps();
    });
  }

  referFollowups() {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Refer ${this.data} Leads`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose=true
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.openReferLead();
        }
      });
    } else {
      this.api.showWarning('Please select atleast one lead');
    }
  }

  openVideoCall() {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send A Video Call Link To ${this.data} Leads `;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose=true
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.bulkVideoCall();
          //  this.refreshLead('event')
          this.refreshFollowUps();
        }
      });
    } else {
      this.api.showWarning('Please select atleast one lead');
    }
  }

  openWhatsAppChat() {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send WhatsApp To ${this.data} Leads`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose=true
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.bulkWhatsAppChat();
          this.refreshFollowUps();
          //  this.refreshLead('event')
        }
      });
    } else {
      this.api.showWarning('Please select atleast one lead to download');
    }
  }

  openSMS(name: any): void {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send SMS To ${this.data} Leads`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose=true

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.bulkSMS();
          this.refreshFollowUps();
          //  this.refreshLead('event')
        }
      });
    } else {
      this.api.showWarning('Please select atleast one lead');
    }
  }

  openEmailChat(selectedData?: any) {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send Email To ${this.data} Leads`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose=true
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.bulkOpenEmailChat();
          //  this.refreshLead('event')
          this.refreshFollowUps();
        }
      });
    } else {
      this.api.showWarning('Please select atleast one lead');
    }
  }
  // selectedLeads:any=[]
  downloadLead() {
    if (this.selectedCheckboxIds.length > 0) {
      this.exportReference = `${environment.live_url}/${environment.export_leads}?ids=${this.selectedCheckboxIds}`;
    } else {
      this.api.showWarning('Please select atleast one lead to download');
    }
  }

  bulkVideoCall() {
    const dialogRef = this.dialog.open(FollowupVideocallComponent, {
      width: '45%',
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.refreshFollowUps();
    });
  }

  bulkSMS() {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: { name: name },
      disableClose: true
    };
    this._bottomSheet.open(FollowupSmsComponent, config);
  }

  bulkWhatsAppChat() {
    const dialogRef = this.dialog.open(FollowupWhatsappchatComponent, {
      width: '45%',
    });
    dialogRef.disableClose=true

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.refreshFollowUps();
    });
  }

  bulkOpenEmailChat(name?: any) {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: { bulkIds: this.selectedCheckboxIds, allChecked: this.checkAll },
      disableClose: true
    };
    this._bottomSheet.open(FollowupEmailComponent, config);
  }
  onClickLink() {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send A Link To  ${this.data} Leads`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose=true

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.paymentDetailsLink();
        }
      });
    } else {
      this.api.showWarning('Please select atleast one lead');
    }
  }
  paymentDetailsLink() {
    const dialogRef = this.dialog.open(FollowupPaymentDetailsComponent, {
      width: '30%',
      height: '70%',
      data: { data: this.selectedCheckboxIds, name: 'BULK' },
    });
    dialogRef.disableClose=true

    dialogRef.afterClosed().subscribe((result: any) => {
      // this.refresh.emit('event')
      this.refreshFollowUps();
    });
  }

  filteredByUpcomingStatus(status: any) {
    console.log(status, 'status');
    this.selectedTab = status;
    const apiUrl = this.filteredBaseUrl + `&follow_up_status=${status}`;
    console.log(apiUrl, 'Base url for All status after filter');
    this.filterFollowUps(apiUrl);
  }

  selectTab(data:any){
if(data==='All')
{
  this.selectedTab='All'
}else if(data==='Upcoming'){
  this.selectedTab='Upcoming'
}else if(data==='Done'){
  this.selectedTab='Done';
}
else{
  this.selectedTab="Missed"
}

  }

  


}
