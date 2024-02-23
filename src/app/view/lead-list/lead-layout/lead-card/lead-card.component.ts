import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { AddLeadComponent } from '../dummy-add/add-lead.component';
import { LeadUploadComponent } from '../lead-upload/lead-upload.component';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { AddNewLeadComponent } from '../add-new-lead/add-new-lead.component';
import { EmitService } from 'src/app/service/emit/emit.service';
import { MatDialog } from '@angular/material/dialog';

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
  searchTerm:any;
  user_id: any;
  user_role: string | null;
 
  
  constructor(
    private _bottomSheet:  MatBottomSheet,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _addLeadEmitter:AddLeadEmitterService,
    private emit:EmitService,
    private dialog:MatDialog) {
      this.user_id = localStorage.getItem('user_id');
      this.user_role = localStorage.getItem('user_role')
    }
  
   
  openBottomSheet(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet'
    };
    this._bottomSheet.open(AddNewLeadComponent,config);
  }
  onChangeSorting(event:any){
    this.sorting = true
     this.sortingType = event.target.innerText
     this.query = (this.user_role === 'counsellor')
      ? `?counsellor_id=${this.user_id}&sort_by=${this.sortingType}&page=1&page_size=${this.pageSize}`
      : `?sort_by=${this.sortingType}&page=1&page_size=${this.pageSize}`;
      
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
    
    const dialogRef = this.dialog.open(LeadUploadComponent, {
      width:'30%',
      height:'60%',
      // data:{data:this.selectedLeads,name:'BULK'},
    });
    dialogRef.disableClose=true


  
    dialogRef.afterClosed().subscribe((result:any) => {});
  }
  ngOnInit(): void {
    
    this.getStatus()
    this.getLeadData('tabLabel')
    this._addLeadEmitter.triggerGet$.subscribe(() => {
      this.getLeadData('tabLabel')
    });
    this.emit.allocateSearch.subscribe((res:any)=>{
      if(res){
        this.getLeadData('tabLabel')
      }
    })
    this.getLeadIds()
    this._addLeadEmitter.leadFilter.subscribe((res)=>{
      if(res){
        this.filterLeads(res)
      }
    })
  }
  applySearch(event:any){
    this.query = `?key=${event}`
    this.searchTerm = event
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
    this.leadCards = [];
    this.totalNumberOfRecords = [];
  
    let apiUrl = (this.user_role === 'counsellor')
      ? `${environment.lead_list}?counsellor_id=${this.user_id}&page=1&page_size=${this.pageSize}`
      : `${environment.lead_list}?page=1&page_size=${this.pageSize}`;
  
    if (tabLabel !== 'tabLabel' && tabLabel.tab.textLabel !== 'All') {
      apiUrl += `&status=${tabLabel.tab.textLabel}`;
    }
   
  
    this._baseService.getData(apiUrl).subscribe(
      (res: any) => {
        if (res.results) {
          this.leadCards = res.results;
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record;
        }
      },
      (error: any) => {
        this.api.showError(error.error.message ? this.api.toTitleCase(error.error.message) : 'An error occurred');
      }
    );
  }
 
  onPageChange(event: any, dataSource: MatTableDataSource<any>, type?: any) {
    if (!event) {
      return;
    }
  
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
   

    let query: string;
    query = (this.user_role === 'counsellor')
    ? `?counsellor_id=${this.user_id}&page=1&page_size=${this.pageSize}`
    : `?page=1&page_size=${this.pageSize}`;
    
    if (type === 'All') {
      query = query;
  
      if (this.sorting) {
        query += `&sort_by=${this.sortingType}`;
      } else if (this.searchTerm) {
        query += `&key=${this.searchTerm}`;
      }
    } else {
      query = `?status=${type}&page=${this.currentPage}&page_size=${event.pageSize}`;
  
      if (this.sorting) {
        query += `&sort_by=${this.sortingType}`;
      }
    }
  
    this._baseService.getData(`${environment.lead_list}${query}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.leadCards = res.results;
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record;
        }
      },
      (error: any) => {
        this.api.showError(error.error.error.message);
      }
    );
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
