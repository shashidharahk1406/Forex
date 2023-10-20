import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { AddLeadComponent } from '../add-lead/add-lead.component';
import { LeadUploadComponent } from '../lead-upload/lead-upload.component';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.css']
})
export class LeadCardComponent implements OnInit {
  allLeadCardsDataSource = new MatTableDataSource<any>([]);
  untouchedLeadCardsDataSource = new MatTableDataSource<any>([]);
  callbackLeadCardsDataSource = new MatTableDataSource<any>([]);
  campusVisitLeadCardsDataSource = new MatTableDataSource<any>([]);
  enrolledLeadCardsDataSource = new MatTableDataSource<any>([]);
  notInterestedLeadCardsDataSource = new MatTableDataSource<any>([]);
  leadsReferredLeadCardsDataSource = new MatTableDataSource<any>([]);
  reEnquiredLeadCardsDataSource = new MatTableDataSource<any>([]);
  onlineLeadCardsDataSource = new MatTableDataSource<any>([]);

  // Define paginator references for all tabs
  @ViewChild('allPaginator') allPaginator!: MatPaginator;
  @ViewChild('untouchedPaginator') untouchedPaginator!: MatPaginator;
  @ViewChild('callbackPaginator') callbackPaginator!: MatPaginator;
  @ViewChild('campusVisitPaginator') campusVisitPaginator!: MatPaginator;
  @ViewChild('enrolledPaginator') enrolledPaginator!: MatPaginator;
  @ViewChild('notInterestedPaginator') notInterestedPaginator!: MatPaginator;
  @ViewChild('leadsReferredPaginator') leadsReferredPaginator!: MatPaginator;
  @ViewChild('reEnquiredPaginator') reEnquiredPaginator!: MatPaginator;
  @ViewChild('onlinePaginator') onlinePaginator!: MatPaginator;
  leadCards: any;
  displayedLeadCards!: MatTableDataSource<any>;
  query!: string;
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;
  totalNumberOfRecords:any;
  statusArray = ['All','Untouched','Callback','Campus Visit','Enrolled','Not Interested','Leads Referred','Re-enquired','Online']
 
  
  constructor(
    private _bottomSheet:  MatBottomSheet,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _addLeadEmitter:AddLeadEmitterService) {}
  
   
  openBottomSheet(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(AddLeadComponent,config);
  }
  
  uploadLeads(): void{
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(LeadUploadComponent,config);
  }
  ngOnInit(): void {
    this.getLeadData('tabLabel')
    this._addLeadEmitter.triggerGet$.subscribe(() => {
      this.getLeadData('tabLabel')
    });
  }
  
  getLeadData(tabLabel: any) {
    
    if (tabLabel === 'tabLabel') {
      // If it's 'All', do not pass any query parameters
      this._baseService.getData(environment.lead_list).subscribe((res: any) => {
        if (res.results) {
          this.leadCards = res.results;
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.allLeadCardsDataSource.paginator = this.allPaginator;
          this.totalNumberOfRecords = res.total_no_of_record
        }
      }, (error: any) => {
        this.api.showError(error.error.message);
      }); 
    }else {
      if(tabLabel.tab.textLabel === 'All' ){
          // If it's 'All', do not pass any query parameters
          this._baseService.getData(`${environment.lead_list}?page=1&page_size=10`).subscribe((res: any) => {
            if (res.results) {
              this.leadCards = res.results;
              this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
              this.totalNumberOfRecords = res.total_no_of_record
            }
          }, (error: any) => {
            this.api.showError(error.error.message);
          });
        }else if(tabLabel.tab.textLabel !== 'All'){
        this.query = `?leadlist_status_name=${tabLabel.tab.textLabel}&page=1&page_size=10`
        this._baseService.getData(`${environment.lead_list}${this.query}`).subscribe((res: any) => {
          if (res.results) {
            this.leadCards = res.results;
            this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
            this.totalNumberOfRecords = res.total_no_of_record
          }
        }, (error: any) => {
          this.api.showError(error.error.message);
        });
      }
     
    }
  }
  
  onPageChange(event: any, dataSource: MatTableDataSource<any>,type?:any) {
    if(event){
      console.log(dataSource)
      const startIndex = event.pageIndex * event.pageSize;
      this.currentPage = event.pageIndex + 1;
      if(type === 'All'){
        this._baseService.getData(`${environment.lead_list}?page=${this.currentPage}&page_size=${event.pageSize}`).subscribe((res: any) => {
          if (res.results) {
            this.leadCards = res.results;
            this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
            this.totalNumberOfRecords = res.total_no_of_record
          }
        }, (error: any) => {
          this.api.showError(error.error.message);
        });
      }
      else{
        
        let query = `?leadlist_status_name=${type}&page=${this.currentPage}&page_size=${event.pageSize}`
          this._baseService.getData(`${environment.lead_list}${query}`).subscribe((res: any) => {
            if (res.results) {
                this.leadCards = res.results;
                this.leadCards = res.results;
                this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
                this.totalNumberOfRecords = res.total_no_of_record
              // this.allLeadCardsDataSource = this.leadCards.slice(startIndex, startIndex + event.pageSize);
            }
          }, (error: any) => {
            this.api.showError(error.error.message);
          });
      }
      
     
    } 

  }
  
  onChange(event:any){
    console.log(event,'EVENT')
  }
   delete(event:any){
   if(event){
    this.getLeadData('tabLabel')
   }
   
   }
   
}
