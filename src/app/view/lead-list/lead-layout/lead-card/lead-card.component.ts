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
import { AddNewLeadComponent } from '../add-new-lead/add-new-lead.component';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.css']
})
export class LeadCardComponent implements OnInit {
  allLeadCardsDataSource:any = new MatTableDataSource<any>([]);
  // Define paginator references for all tabs
  @ViewChild('allPaginator') allPaginator!: MatPaginator;
  
  leadCards: any;
  displayedLeadCards!: MatTableDataSource<any>;
  query!: string;
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;
  totalNumberOfRecords:any;
  statusArray:any = []
  sorting: boolean = false;
  sortingType: any;
  leadAllIds: any = [];
 
  
  constructor(
    private _bottomSheet:  MatBottomSheet,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _addLeadEmitter:AddLeadEmitterService) {}
  
   
  openBottomSheet(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(AddNewLeadComponent,config);
  }
  onChangeSorting(event:any){
    this.sorting = true
     this.sortingType = event.target.innerText
      this.query = `?sort_by=${this.sortingType}&page=1&page_size=10`
      this._baseService.getData(`${environment.lead_list}${this.query}`).subscribe((res: any) => {
        if (res.results) {
          this.leadCards = res.results;
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record
        }
      }, (error: any) => {
         this.api.showError(this.api.toTitleCase(error.error.message));
      });
  }
  uploadLeads(): void{
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(LeadUploadComponent,config);
  }
  ngOnInit(): void {
    this.getStatus()
    this.getLeadData('tabLabel')
    this._addLeadEmitter.triggerGet$.subscribe(() => {
      this.getLeadData('tabLabel')
    });
    this.getLeadIds()
    this._addLeadEmitter.leadFilter.subscribe((res)=>{
      if(res){
        this.filterLeads(res)
      }
    })
  }
  applySearch(event:any){
    this.query = `?key=${event}`
    this._baseService.getData(`${environment.lead_list}${this.query}`).subscribe((res: any) => {
      if (res.results) {
        this.leadCards = res.results;
        this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
        this.totalNumberOfRecords = res.total_no_of_record
      }
    }, (error: any) => {
       this.api.showError(this.api.toTitleCase(error.error.message));
    });
  }
  getStatus(){
    this._baseService.getData(`${environment.lead_status}`).subscribe((res:any)=>{
     if(res.results){
       this.statusArray = res.results;
     }
    },(error:any)=>{
      this.api.showError(this.api.toTitleCase(error.error.message))
    })
   }
   filterLeads(apiUrl:any){
    this._baseService.getData(apiUrl).subscribe((res:any) => {
      if(res){
        this.api.showSuccess(res.message)
        this.leadCards = res.results;
        this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
        this.allLeadCardsDataSource.paginator = this.allPaginator;
        this.totalNumberOfRecords = res.total_no_of_record
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }));

   }
  getLeadData(tabLabel: any) {
    
    if (tabLabel === 'tabLabel') {
      // If it's 'All', do not pass any query parameters
      this._baseService.getData(`${environment.lead_list}?page=1&page_size=10`).subscribe((res: any) => {
        if (res.results) {
          this.leadCards = res.results;
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.allLeadCardsDataSource.paginator = this.allPaginator;
          this.totalNumberOfRecords = res.total_no_of_record
        }
      }, (error: any) => {
         this.api.showError(this.api.toTitleCase(error.error.message));
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
            this.api.showError(error.error.error.message);
          });
        }else if(tabLabel.tab.textLabel !== 'All'){
        this.query = `?status=${tabLabel.tab.textLabel}&page=1&page_size=10`
        this._baseService.getData(`${environment.lead_list}${this.query}`).subscribe((res: any) => {
          if (res.results) {
            this.leadCards = res.results;
            this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
            this.totalNumberOfRecords = res.total_no_of_record
          }
        }, (error: any) => {
           this.api.showError(this.api.toTitleCase(error.error.message));
        });
      }
     
    }
  }
  
  onPageChange(event: any, dataSource: MatTableDataSource<any>,type?:any) {
    if(event){
      this.currentPage = event.pageIndex + 1;
      if(type === 'All'){
        let query:any;
        if(this.sorting){
          query = `?page=${this.currentPage}&page_size=${event.pageSize}&sort_by=${this.sortingType}`
        }else{
           query = `?page=${this.currentPage}&page_size=${event.pageSize}`
        }
        this._baseService.getData(`${environment.lead_list}${query}`).subscribe((res: any) => {
          if (res.results) {
            this.leadCards = res.results;
            this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
            this.totalNumberOfRecords = res.total_no_of_record
          }
        }, (error: any) => {
          this.api.showError(error.error.error.message);
        });
      }
      else{
        let query:any;
        if(this.sorting){
          query = `?status=${type}&page=${this.currentPage}&page_size=${event.pageSize}&sort_by=${this.sortingType}`
        }else{
           query = `?status=${type}&page=${this.currentPage}&page_size=${event.pageSize}`
        }
        
          this._baseService.getData(`${environment.lead_list}${query}`).subscribe((res: any) => {
            if (res.results) {
                this.leadCards = res.results;
                this.leadCards = res.results;
                this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
                this.totalNumberOfRecords = res.total_no_of_record
              // this.allLeadCardsDataSource = this.leadCards.slice(startIndex, startIndex + event.pageSize);
            }
          }, (error: any) => {
            this.api.showError(error.error.error.message);
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
   getLeadIds(){
    this._baseService.getData(environment.lead_ids).subscribe((res:any)=>{
      if(res){
        this.leadAllIds = res.lead_ids
      }
    },((error:any)=>{
      this.api.showError(error.error.error.message)
    }))
    return this.leadAllIds
  }
  reLoad(event:any){
    this.totalNumberOfRecords = []
    this.getStatus()
    this.getLeadData('tabLabel')
    this.getLeadIds()
  }
  
   
}
