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
  DoCheck,
  OnDestroy,
  HostListener,
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
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterFollowUp } from 'src/app/filter/filter';
import { NavigationStart, Router } from '@angular/router';
export let browserRefresh = false;

@Component({
  selector: 'app-my-followup-card-content',
  templateUrl: './my-followup-card-content.component.html',
  styleUrls: ['./my-followup-card-content.component.css'],
})
export class MyFollowupCardContentComponent implements OnInit, OnDestroy {
  filterFollowUp = new FilterFollowUp();
  subscription!: Subscription;
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

  totalNumberOfRecords: any=0;
  searchTerm: string = '';
  followUpsDataTemp: any = [];

  allData = []; //Store all data from provider
  filterData = []; //Store filtered data
  selectedCheckboxIds: any = [];
  totalCount: any;
  checkAll: boolean = false;
  role: any;
  selectedTab: any ='All';  
  query!: string;
  followUpsData2: any;
  filtered:boolean = false;

  allFollowUpDataSource: any = new MatTableDataSource<any>([]);
  // Define paginator references for all tabs
  @ViewChild('allPaginator') allPaginator!: MatPaginator;
  currentPage: any;
  user_role: any;
  user_id: any;
  allSelectedCheckBoxes: boolean = false;
  isSelectedcheckBox!: boolean;
  minDate!: Date;
  counsellors_ids:any;

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
    private dataService: DataService,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.alwaysShowCalendars = true;
    this.minDate = new Date('1900-01-01');
    this.counsellor_id = localStorage.getItem('user_id');
    // console.log(this.counsellor_id, 'counsellor id');
    this.role = localStorage.getItem('user_role');
    this.user_id = localStorage.getItem('user_id');
    this.user_role = localStorage.getItem('user_role');
    this.counsellors_ids=localStorage.getItem('counsellor_ids')
    // console.log(this.role, 'roleeeeeeeeeeeeeee');
    // console.log(data, 'data');
   

    // if (window.performance) {
      
    //   if (performance.navigation.type === 1) {
    //     // This means the page is being hard refreshed
    //     // this.localStorageService.clearLocalStorage();
    //     localStorage.removeItem('followUpFilter')
    //   }}


    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        console.log('refresh the page after presssing ctrl shift r');
        
       
      }
     
  });

    
    
  

    this.dataService.data$.subscribe((data) => {
      if (data != null) {
        // console.log(data);
        // this.refreshFollowUps();
        this.filtered=data;

        this.APICAll();
      }
    });
  }

  filteredBaseUrl: any;

  receiveData() {
    const data = this.dataService.getSharedData();
    console.log(data, 'filter reset');
  }

  searchForm!: FormGroup;

  updateAPIURL: any;
  ngOnInit(): void {
   console.log( this.dataService.getfiletredFormValues()," this.dataService.getfiletredFormValues()");
   
  
   
    this.dataService.dataUpdated.subscribe((res: any) => {
      console.log(res, 'filtered');
      this.filtered = res;
    });


    // var data: any =this.dataService.getfiletredFormValues();
    // // var resp: any = JSON.parse(data);
    // console.log(data.value,"data");
    
    // var resp: any = data
    // let result=Object.values(data);
    // console.log(result,"result");
    

    // result.forEach((res:any)=>{
    //   console.log(this.filtered,'filtered');
      
    //   if(res!==''){
    //     console.log(res!=='',"res!==''");
    //     console.log(this.filtered,'filtered in if block');
        
    //     this.filtered=true;
    //   }
    //   else{
    //     console.log(this.filtered,'filtered in else block');
    //     this.filtered=false;
    //   }
    // })

   




    //  this.clearLocalStorageOnHardRefresh();
    

    // this.getFollowupIds();
    console.log('Before =============>', this.updateAPIURL);

    this.updateAPIURL = this.dataService.getFollowupfilterURL();

    console.log('updated url==>', this.updateAPIURL);

    this.APICAll();
   
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

  // receiveFilterCount:any=[]
  filterFollowups() {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',

      disableClose: true,
      data:this.selectedTab
    };
    let data = this._bottomSheet.open(MyFollowupFilterComponent, config);

    data.afterDismissed().subscribe((dataFromChild) => {
      console.log(dataFromChild, 'dataFromChild');
      if (dataFromChild === 'Reset') {
        this.refreshFollowUps();
      } else if (
        dataFromChild === 'Submitted' ||
        dataFromChild === 'Close-ion-clicked'
      ) {
        this.ngOnInit();
      }
    });
  }

  EditFollowups(id: any) {
    console.log(id, 'leadid');
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: { id: id, data: this.data },
      disableClose: true,
    };
    let data = this._bottomSheet.open(EditFollowupComponent, config);
    data.afterDismissed().subscribe((dataFromChild) => {
      // console.log(dataFromChild, 'dataFromChild');
      this.ngOnInit();
    });
  }

  followupSearch: any = '';
  searchValue: any;

  search(event: any) {
    // console.log(event, 'eventtttttttttttttt');
  }

  selectAllCheckboxes: boolean = false;

  closePopup() {
    this._bottomSheetRef.dismiss();
  }

  allLeadIds: any = [];

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('coming in to ngonchanges');

  //   this.APICAll();
  //   if (changes['renderingData']) {

  //     this.followUpsData2 = this.renderingData;
  //     console.log(this.followUpsData2,"followUpsData2 in ng onchanges");

  //     console.log(this.selectedCheckboxIds.length,"this.selectedCheckboxIds.length");

  //     if (this.selectedCheckboxIds.length === this.totalCount) {
  //       this.checkAll = true;
  //       this.checkBoxData();
  //     } else {
  //       this.checkAll = false;
  //       this.checkBoxData();
  //     }
  //   }
  // }

  resettingDataToOneArray() {
    // console.log('coming in to ngonchanges');

    // this.APICAll();
    // console.log(this.renderingData,'this.renderingData in to ngonchanges');
    // this.followUpsData2 = this.renderingData;
    // console.log(this.followUpsData2,"followUpsData2 in ng onchanges");

    // console.log(this.selectedCheckboxIds.length,"this.selectedCheckboxIds.length");
    this.followUpsData2 = this.renderingData;

    if (this.selectedCheckboxIds.length === this.totalCount) {
      this.checkAll = true;
      this.checkBoxData();
    } else {
      this.checkAll = false;
      this.checkBoxData();
    }
    // if (changes['renderingData']) {

    // }
  }
  selectedLeadName: any;
  onCheckboxChange(event: MatCheckboxChange, itemId: string, leadName: any) {
    console.log(itemId, 'itemId');
    // console.log(leadName, 'from selected lead');
    
    
    this.selectedLeadName = leadName;
    if (event.checked) {
      // Checkbox is checked, add the item ID to the array if it's not already there
      if (!this.selectedCheckboxIds) {
        this.selectedCheckboxIds = [];
      } else if (!this.selectedCheckboxIds.includes(itemId)) {
        this.selectedCheckboxIds.push(itemId);
        if (this.selectedCheckboxIds.length === this.totalCount && this.totalCount>0) {
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

  // onCheckboxChange(event: MatCheckboxChange, itemId: string) {
  //   console.log(itemId,"itemId")
  //   if (event.checked) {
  //     // Checkbox is checked, add the item ID to the array if it's not already there
  //     if (!this.selectedCheckboxIds) {
  //       this.selectedCheckboxIds = [];
  //     }

  //     else if (!this.selectedCheckboxIds.includes(itemId)) {
  //       this.selectedCheckboxIds.push(itemId);
  //       if (this.selectedCheckboxIds.length === this.totalCount) {
  //         this.checkAll = true;
  //         this.checkBoxData()

  //       }
  //     }

  //     else{
  //       this.checkAll = false;
  //     }
  //   } else {
  //     // Checkbox is unchecked, remove the item ID from the array if it exists
  //     const index = this.selectedCheckboxIds.indexOf(itemId);
  //     if (index !== -1) {
  //       this.selectedCheckboxIds.splice(index, 1);
  //       this.checkAll = false;
  //       this.checkBoxData()
  //     }
  //   }
  // }
  checkedCheckbox: boolean = false;
  selectedCheckboxIdsAll: any = [];
  selectedCheckboxIdsUpcoming: any = [];
  selectedCheckboxIdsDone: any = [];
  selectedCheckboxIdsMissed: any = [];
  selectAll(event: any, data: any) {
    console.log(this.selectedTab, '(this.selectedTab');

    // if(this.selectedTab==='All'){
    //   console.log(this.selectedTab,"this.selectedTab");
    // }

    // console.log(data,"EVENT data")
    // this.selectedCheckboxIds=[]
    this.checkAll = !this.checkAll;
    if (event.checked == true) {
      this.renderingData.forEach((element: any, index: any) => {
        if (element) {
          element.checked = true;

          this.selectedCheckboxIds = this.followupIds;
        }
      });
      // console.log(this.selectedCheckboxIds, 'allleaids');

      // console.log(this.selectedCheckboxIds, 'LEADIDS');
      this.checkBoxData();
    } else {
      this.renderingData.forEach((element: any) => {
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
      // console.log(this.selectedCheckboxIds,"selectedCheckboxIds");
      // console.log(this.followUpsData2,"followUpsData2");

      const leadFollowUpItem = this.followUpsData2?.find(
        (item: any) => item.lead_id === selectedId
      );
      // console.log(leadFollowUpItem, 'leadFollowUpItem');

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
          // console.log(this.countData, 'followups counts on date');
        },
        (error: any) => {
          this.api.showError(error.error.message);
        }
      );
  }

  exportReference: any;

  noData: boolean = false;
  @ViewChild('noResultsSection') noResultsSection: any;

  clearSearch(event: any) {
    this.followUpsData = this.followUpsDataTemp;
    console.log('Event', event.data);
    console.log(this.followUpsData.length, 'length');
  }

  onChange(event: any) {
    this.selectedSort.emit(event);
  }
  onSelect(event: any) {
    this.selectedSort.emit(event);
  }

  filterCount: any;
  api_url: any = environment.live_url;

  refreshFollowUps() {
    this.selectedCheckboxIds = [];
    this.checkAll = false;
    this.selectedDate = null;
    this.filtered = false;
    this.tempSearch = '';
    this.renderingData = [];
    localStorage.removeItem('followUpFilter');
    localStorage.removeItem('data.target.value');
    // console.log("updateAPIURL==>", this.updateAPIURL);
    this.dataService.setFilteredFollowUpURL(
      `${this.api_url}/api/follow-up/?page=1&page_size=5`
    );
    this.allPaginator.pageIndex = 0;
    this.allPaginator.pageSize = 5;
    this.ngOnInit();
    this.selectedTab = 'All';
  }


  ngOnDestroy(): void {
    this.selectedCheckboxIds = [];
    this.checkAll = false;
    this.selectedDate = null;
    // this.filtered = true;
    this.tempSearch = '';
    this.renderingData = [];
    if(this.isSearched===true){
   this.dataService.setFilteredFollowUpURL(
      `${this.api_url}/api/follow-up/?page=1&page_size=5`
    );
    }
    
    // this.allPaginator.pageIndex = 0;
 
    // this.allPaginator.pageSize = 5;
    // this.ngOnInit();
    // this.selectedTab = 'All';
  }

  addCount() {
    if (this.checkAll) {
      this.data = 'All';
    } else {
      this.data = this.selectedCheckboxIds.length;
      // console.log(this.selectedCheckboxIds, 'this.selectedCheckBoxesId');
    }
  }

  openVideoCall(data: any) {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send A Video Call Link To ${this.data} Leads `;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.bulkVideoCall();
          //  this.refreshLead('event')
          this.refreshFollowUps();
        }
      });
    } else {
      this.api.showWarning('Please select atleast one Followup');
    }
  }

  IndividualopenVideoCall(selectedData: any) {
    const dialogRef = this.dialog.open(FollowupVideocallComponent, {
      width: '45%',
      data: selectedData,
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result: any) => {
      ////console.log('The dialog was closed');
    });
  }

  IndividualopenSMS(selectedData: any): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      disableClose: true,
      data: selectedData,
    };
    this._bottomSheet.open(FollowupSmsComponent, config);
  }

  IndividualopenWhatsAppChat(selectedData: any) {
    const dialogRef = this.dialog.open(FollowupWhatsappchatComponent, {
      width: '45%',
      data: selectedData,
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result: any) => {
      ////console.log('The dialog was closed');
    });
  }

  openWhatsAppChat() {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send WhatsApp To ${this.data} Followups`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.bulkWhatsAppChat();
          this.refreshFollowUps();
          //  this.refreshLead('event')
        }
      });
    } else {
      this.api.showWarning('Please select atleast one Followup to download');
    }
  }

  openSMS(name: any): void {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send SMS To ${this.data} Followup`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose = true;

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.bulkSMS();
          this.refreshFollowUps();
          //  this.refreshLead('event')
        }
      });
    } else {
      this.api.showWarning('Please select atleast one Followup');
    }
  }

  downloadLead() {
    if (this.selectedCheckboxIds.length > 0) {
      this.exportReference = `${environment.export_leads}?ids=${this.selectedCheckboxIds}`;
      this.renderingData.forEach((c: any) => {
        c.checked = false;
        this.checkAll = false;
      });
    } else {
      this.api.showWarning('Please select atleast one Followup to download');
    }
  }

  bulkVideoCall() {
    const dialogRef = this.dialog.open(FollowupVideocallComponent, {
      width: '45%',
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log('The dialog was closed');
      this.refreshFollowUps();
    });
  }

  bulkSMS() {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: { name: name },
      disableClose: true,
    };
    this._bottomSheet.open(FollowupSmsComponent, config);
  }

  bulkWhatsAppChat() {
    const dialogRef = this.dialog.open(FollowupWhatsappchatComponent, {
      width: '45%',
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log('The dialog was closed');
      this.refreshFollowUps();
    });
  }

  bulkOpenEmailChat(name?: any) {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {
        bulkIds: this.selectedCheckboxIds,
        allChecked: this.checkAll,
        name: this.selectedLeadName,
      },
      disableClose: true,
    };
    let bottomSheetRef=this._bottomSheet.open(FollowupEmailComponent, config);
    console.log(bottomSheetRef,"bottomSheetRef");
    
    bottomSheetRef.afterDismissed().subscribe((res:any)=>{
      console.log(res,"pop closed");

      
      if(res==true){  
        this.refreshFollowUps();
        this.renderingData.forEach((c: any) => {
          c.checked = false;
          this.checkAll = false;
        });
      }
    })
  }
  onClickLink(data:any) {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send A Link To  ${this.data} Leads`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose = true;

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.paymentDetailsLink();
        }
      });
    } else {
      this.api.showWarning('Please select atleast one Followup');
    }
  }
  paymentDetailsLink() {
    const dialogRef = this.dialog.open(FollowupPaymentDetailsComponent, {
      width: '30%',
      height: '70%',
      data: { data: this.selectedCheckboxIds, name: 'BULK' },
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result: any) => {
      // this.refresh.emit('event')
      if(result){
        this.refreshFollowUps();
      }
     
    });
  }

  // ============================================================================

  renderingData: any;
  countDataValue: any = {};
  loading:boolean=true

  APICAll() {
    // this.getFollowupIds();
    // this.totalNumberOfRecords = [];
    // this.renderingData
    // console.log("url to send i  API", url);
    this.renderingData = [];

    console.log('final data url==>', this.updateAPIURL);
    //   this.totalNumberOfRecords = [];
    // this.api.FollowUpFilterApi(this.updateAPIURL).subscribe(
    //   (res: any) => {
    //     console.log(res, 'followup api  filetr all combination');
    //     this.followUpsData2 = res.results.data;
    //     this.renderingData = res.results.data;
    //     this.totalNumberOfRecords = res.total_no_of_record;
    //     this.countDataValue = res.results.data_count;

    //     this.checkBoxData();
    //   },
    //   (error: any) => {
    //     console.log(error, 'error');
    //   }
    // );

    // this.dataService.setFilteredFollowUpURL(url)

    // const data = this.dataService.getFollowupfilterURL()
    if (this.role === 'counsellor') {
      this.renderingData = [];

      this.updateAPIURL += `&counsellor_id=${this.user_id}`;
      // console.log( this.updateAPIURL," this.updateAPIURL for counsellor");

      this.totalNumberOfRecords = 0;
      this.renderingData=[]
      this.countDataValue = [];
      this.allFollowUpDataSource = new MatTableDataSource<any>(this.renderingData=[]);
      this.api.FollowUpFilterApi(this?.updateAPIURL).subscribe(
        (res: any) => {

          this.totalCount=res.total_no_of_record;
          console.log(this.totalCount,"this.totalCount for counsellor");
          // console.log(res, 'followup api  filetr all combination');
          this.followUpsData2 = res.results.data;
          this.allFollowUpDataSource = new MatTableDataSource<any>(this.renderingData);
          this.totalNumberOfRecords = res.total_no_of_record;
          console.log(this.followUpsData2,"this.followUpsData2");

          this.renderingData = res.results.data;
          this.followupIds=res.results.lead_ids

          this.countDataValue = res.results.data_count;
          
          console.log( this.totalNumberOfRecords," this.totalNumberOfRecords");
          

          if (this.selectedCheckboxIds.length !== 0) {
            // console.log(this.selectedCheckboxIds,"data prsent");
            this.followUpsData2.forEach((c: any) => {
            
              c.checked =   this.selectedCheckboxIds.includes(c.lead_id);

             
            });

          } else {
            this.checkAll = false;
          }
          if(this.selectedCheckboxIds.length===this.totalCount){
            this.checkAll = true;
          }


          this.loading=false


          
        },
        (error: any) => {
          console.log(error, 'error');
        }
      );
    } else if(this.role==='Admin') {
      this.totalNumberOfRecords = 0;
      this.renderingData = [];
      this.countDataValue = [];
      this.allFollowUpDataSource = new MatTableDataSource<any>(this.renderingData=[]);

      // console.log(this.updateAPIURL,"this.updateAPIURL for admin");

      this.updateAPIURL += `&admin_id=${this.user_id}&counsellor_ids=${this.counsellors_ids}`;

      this.api.FollowUpFilterApi(this?.updateAPIURL).subscribe(
        (res: any) => {
          
         
          console.log(this.allPaginator,"paginator for admin");
          
          // console.log(res, 'followup api  filetr all combination');
          this.followUpsData2 = res.results.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          console.log(this.totalNumberOfRecords," this.totalNumberOfRecords for admin");
          
          this.renderingData = res.results.data;
          this.followupIds=res.results.lead_ids
          console.log(this.followupIds," this.followupIds for admin in api call");
          

          this.totalCount=res.total_no_of_record;
          console.log( this.totalCount," this.totalCount");
          this.allFollowUpDataSource = new MatTableDataSource<any>(this.renderingData);
          this.countDataValue = res.results.data_count;
          
          if (this.selectedCheckboxIds.length !== 0) {
            // console.log(this.selectedCheckboxIds,"data prsent");
            this.renderingData.forEach((c: any) => {
              
              c.checked = this.selectedCheckboxIds.includes(c.lead_id);
            
              localStorage.setItem(
                'allSelectedCheckBoxes',
                JSON.stringify(true)
              );
            });
          } else {
            this.checkAll = false;
          }
          if(this.selectedCheckboxIds.length===this.totalCount){
            this.checkAll = true;
          }
          this.loading=false
          // console.log(this.renderingData,"sssssssssssssssssssssssssssss");
        
        },
        (error: any) => {
          console.log(error, 'error');
          this.loading=false

        }
      );
    }
    else{

      this.totalNumberOfRecords = 0;
      this.renderingData = [];
      this.countDataValue = [];
      this.allFollowUpDataSource = new MatTableDataSource<any>(this.renderingData=[]);

      // console.log(this.updateAPIURL,"this.updateAPIURL for admin");

     

      this.api.FollowUpFilterApi(this?.updateAPIURL).subscribe(
        (res: any) => {
          
         
          console.log(this.allPaginator,"paginator for admin");
          
          // console.log(res, 'followup api  filetr all combination');
          this.followUpsData2 = res.results.data;
          this.totalNumberOfRecords = res.total_no_of_record;
          console.log(this.totalNumberOfRecords," this.totalNumberOfRecords for admin");
          
          this.renderingData = res.results.data;
          this.followupIds=res.results.lead_ids
          console.log(this.followupIds," this.followupIds for admin in api call");
          

          this.totalCount=res.total_no_of_record;
          console.log( this.totalCount," this.totalCount");
          this.allFollowUpDataSource = new MatTableDataSource<any>(this.renderingData);
          this.countDataValue = res.results.data_count;
          
          if (this.selectedCheckboxIds.length !== 0) {
            // console.log(this.selectedCheckboxIds,"data prsent");
            this.renderingData.forEach((c: any) => {
              
              c.checked = this.selectedCheckboxIds.includes(c.lead_id);
            
              localStorage.setItem(
                'allSelectedCheckBoxes',
                JSON.stringify(true)
              );
            });
          } else {
            this.checkAll = false;
          }
          if(this.selectedCheckboxIds.length===this.totalCount){
            this.checkAll = true;
          }
          this.loading=false
          // console.log(this.renderingData,"sssssssssssssssssssssssssssss");
        
        },
        (error: any) => {
          console.log(error, 'error');
          this.loading=false

        }
      );

    }
  }

  getSort(data: any) {
    let sort_by = this.filterFollowUp.getSortDataBYForm(
      'filter_by',
      data.target.innerText
    );

    this.updateAPIURL += sort_by['apistring'];

    this.dataService.setFilteredFollowUpURL(this.updateAPIURL);

    // this.APICAll();
    this.ngOnInit();
  }

  getFilter(data: any) {
    
    this.selectedTab = data;
    // localStorage.setItem('selectedTab',this.selectedTab)
this.selectedCheckboxIds=[]
    const apiurl: any = this.filterFollowUp.getFilterFollowup(
      'follow_up_status',
      data,
      this.updateAPIURL
    );
    this.allPaginator.pageIndex = 0;
    this.allPaginator.pageSize = 5;

    let pageDataKeyValue = [
      { key: 'page', value: 1 },
      { key: 'page_size', value: 5 },
      apiurl,
    ];

    pageDataKeyValue.forEach((element: any) => {
      console.log(element);

      let value = this.filterFollowUp.updateUrlParameter(
        this.updateAPIURL,
        element['key'],
        element['value']
      );
      this.updateAPIURL = value;
    });

    // let value = this.filterFollowUp.updateUrlParameter(
    //   this.updateAPIURL,
    //   apiurl.key,
    //   apiurl.value
    // );

    // this.updateAPIURL = value;
    this.dataService.setFilteredFollowUpURL(this.updateAPIURL);
    // this.APICAll();
    this.ngOnInit();
  }

  selectDate(data: any) {
    const date = this.datePipe.transform(data, 'yyyy-MM-dd');

    const apiurl: any = this.filterFollowUp.getFilteredDate(date);
    // console.log('apiurl', apiurl);

    let pageDataKeyValue = [
      { key: 'page', value: 1 },
      { key: 'page_size', value: 5 },
      apiurl,
    ];

    pageDataKeyValue.forEach((element: any) => {
      // console.log(element);

      let value = this.filterFollowUp.updateUrlParameter(
        this.updateAPIURL,
        element['key'],
        element['value']
      );
      this.updateAPIURL = value;
    });

    // this.APICAll(this.updateAPIURL)
    console.log('url i  select date', this.updateAPIURL);

    this.dataService.setFilteredFollowUpURL(this.updateAPIURL);
    // this.APICAll();
    this.ngOnInit();
  }

  tempSearch: any;
  isSearched:boolean=false;
  getSearchValue(data: any) {
this.isSearched=true
    this.loading=true;
    const apiurl: any = this.filterFollowUp.getSearch(data.target.value);
    localStorage.setItem('data.target.value', data.target.value);

    let pageDataKeyValue = [
      { key: 'page', value: 1 },
      { key: 'page_size', value: 5 },
      apiurl,
    ];

    pageDataKeyValue.forEach((element: any) => {
      // console.log(element);

      let value = this.filterFollowUp.updateUrlParameter(
        this.updateAPIURL,
        element['key'],
        element['value']
      );
      this.updateAPIURL = value;
    });

    // let value = this.filterFollowUp.updateUrlParameter(
    //   this.updateAPIURL,
    //   apiurl.key,
    //   apiurl.value
    // );

    // this.updateAPIURL = value;

    // this.APICAll(this.updateAPIURL)
    this.dataService.setFilteredFollowUpURL(this.updateAPIURL);
    // this.APICAll();
    this.ngOnInit();
  }

  showSendMailForm(data: any, lead_name: any = null) {
    if (this.selectedCheckboxIds <= 1) {
    }
    let data_val = `Do You Want To Send Email To ${lead_name} `;
    const dialogRef = this.dialog.open(GenericCountComponent, {
      width: '40%',
      data: data_val,
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'yes') {
        const config: MatBottomSheetConfig = {
          panelClass: 'lead-bottom-sheet',
          disableClose: true,
          data: {
            selectedData: data,
            lead_name: lead_name,
          },
        };

        this._bottomSheet.open(FollowupEmailComponent, config);
      }
    });
  }

  openEmailChat(selectedData?: any) {
    this.addCount();
    if (this.data !== 0) {
      let data = `Do You Want To Send Email To ${this.data} Followups`;
      const dialogRef = this.dialog.open(GenericCountComponent, {
        width: '40%',
        data: data,
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'yes') {
          this.bulkOpenEmailChat();
          
        }
      });
    } else {
      this.api.showWarning('Please select atleast one Followup');
    }
  }

  openEmailSendoutForm(data: any) {
    if (data == 'All') {
      if (this.selectedCheckboxIds.length == 0) {
        this.api.showWarning('Please select atleast one Followup');
      } else {
        this.showSendMailForm(this.selectedCheckboxIds, 'All');
      }
    } else {
      this.showSendMailForm([data.lead_id], data.lead);
    }
  }

  sendVideoCallInvite(data: any, lead_name: any = null) {
    let data_val = `Do You Want To Send Video Call Invite To ${lead_name} Leads`;
    const dialogRef = this.dialog.open(GenericCountComponent, {
      width: '40%',
      data: data_val,
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'yes') {
        const config: MatBottomSheetConfig = {
          panelClass: 'lead-bottom-sheet',
          disableClose: true,
          data: {
            selectedData: data,
            lead_name: lead_name,
          },
        };

        this._bottomSheet.open(FollowupVideocallComponent, config);
      }
    });
  }

  openVideoCallForm(data: any) {
    if (data == 'All') {
      if (this.selectedCheckboxIds.length == 0) {
        this.api.showWarning('Please select atleast one Followup');
      } else {
        this.sendVideoCallInvite(this.selectedCheckboxIds);
      }
    } else {
      this.sendVideoCallInvite([data.lead_id], data.lead);
    }
  }

  followupIds: any;
  // getFollowupIds() {
  //   console.log(this.selectedTab, 'this.selectedTab');
  //   if(this.role==='counsellor'){
  //     // this.selectedCheckboxIds=[]



  //   this.api.getLeadFollowUpIdsForCounsellor(this.selectedTab,this.counsellor_id).subscribe((res: any) => {
  //     // this.followupIds = res.lead_ids;
  //     console.log(this.followupIds, 'lead ids for counsellor');

  //     if (this.selectedTab === 'Upcoming') {
  //       console.log(this.upcomingselectedIds, 'this.upcomingselectedIds');

  //       this.upcomingselectedIds = res.lead_ids;
  //     } else if (this.selectedTab === 'Done') {
  //       console.log(this.doneSelectedIds, 'this.doneSelectedIds');
  //       this.doneSelectedIds = res.lead_ids;
  //     } else if (this.selectedTab === 'Missed') {
  //       this.missedSelectedIds = res.lead_ids;
  //       console.log();

  //       console.log(this.missedSelectedIds, 'this.missedSelectedIds');
  //     }

  //     // console.log(this.followupIds, 'this.followupIds');
  //   });
  //   }else{
  //     this.api.getLeadFollowUpIdsForAdmin(this.selectedTab).subscribe((res:any)=>{
  //       console.log(res,"leadids for admin");
        
  //       this.followupIds=res.lead_ids
  //     })
  //   }

  // }

  // checkUncheckAll(evt: any, data: any) {
  //   console.log(evt.checked, 'evt');
  //   if (evt.checked) {
  //     this.renderingData.forEach((c: any) => {
  //       c.checked = evt.checked;

  //     });
  //     this.followupIds.forEach((element:any) => {

  //     });
  //     this.selectedCheckboxIds = this.followupIds;
  //     console.log(this.selectedCheckboxIds,"this.selectedCheckboxIds");
  //     console.log(this.renderingData,"checked items");
  //     this.checkBoxData();
  //   } else {
  //     if (evt.checked == false) {
  //       this.renderingData.forEach((c: any) => {
  //         c.checked = false;
  //         this.selectedCheckboxIds = [];
  //       });
  //     }
  //   }
  // }

  // isAllSelected(evt: any, index: any, lead_name: any,lead_id:any) {
  //   this.selectedLeadName = lead_name;
  //   // console.log(index,l_id,"id","lead_id");

  //   this.renderingData[index].checked = evt.checked;
  //   this.checkAll = this.renderingData.every(
  //     (item: any) => item.checked == true
  //   );
  // }

  upcomingselectedIds: any = [];
  doneSelectedIds: any = [];
  missedSelectedIds: any = [];
  selectAll1(event: any, data: any) {
    // console.log(data,"EVENT data")
    this.checkAll = !this.checkAll;
    if (event.checked == true) {
      if (this.selectedTab === 'All') {
        console.log(this.selectedTab, 'this.selectedTab');
      }

      this.renderingData.forEach((element: any, index: any) => {
        if (element) {
          element.checked = true;

          this.selectedCheckboxIds = this.followupIds;
        }
      });
      // console.log(this.selectedCheckboxIds, 'allleaids');

      // console.log(this.selectedCheckboxIds, 'LEADIDS');
      this.checkBoxData();
    } else {
      this.renderingData.forEach((element: any) => {
        if (element) {
          element.checked = false;

          if (element.checked == false) {
            this.selectedCheckboxIds = [];
          }
        }
      });
    }
  }
  onPageChangeNew(event: any) {
    // this.isSelectedcheckBox=JSON.parse(localStorage.getItem("allSelectedCheckBoxes" ))

    event.pageIndex += 1;
    let pageDataKeyValue = [
      { key: 'page', value: event.pageIndex },
      { key: 'page_size', value: event.pageSize },
    ];

    pageDataKeyValue.forEach((element: any) => {
      // console.log(element);

      let value = this.filterFollowUp.updateUrlParameter(
        this.updateAPIURL,
        element['key'],
        element['value']
      );
      this.updateAPIURL = value;
    });
    // console.log(this.updateAPIURL, 'pagination');

    this.dataService.setFilteredFollowUpURL(this.updateAPIURL);

    // this.APICAll();

    this.ngOnInit();
  }
//   @HostListener('document:keydown', ['$event'])
// keydownHandler(event: KeyboardEvent): void {
//     if (event && event.ctrlKey && event.keyCode === 116) {
//         // window.localStorage.clear();
//       //  window.localStorage.removeItem('followUpFilter')
//       localStorage.removeItem('followUpFilter')
//     }
// }


// clearLocalStorageOnHardRefresh() {
//   if (window.performance) {
//     if (performance.navigation.type === 1) {
//       // This means the page is being hard refreshed
//       // this.localStorageService.clearLocalStorage();
//       localStorage.removeItem('followUpFilter')
//     }
//   }
// }
}
