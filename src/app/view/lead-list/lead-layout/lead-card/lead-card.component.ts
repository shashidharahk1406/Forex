import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { LeadUploadComponent } from '../lead-upload/lead-upload.component';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { AddNewLeadComponent } from '../add-new-lead/add-new-lead.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.css']
})
export class LeadCardComponent implements OnInit {
  allLeadCardsDataSource:any = new MatTableDataSource<any>([]);
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
  
  leadFilter: boolean = false;
  user_role: any;
  permissions:any;
  bulk_Upload: any;
  assigned_counsellor_ids:any ;
 
  
  constructor(
    private _bottomSheet:  MatBottomSheet,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _addLeadEmitter:AddLeadEmitterService,
    private dialog:MatDialog
  ) {
      this.user_id = localStorage.getItem('user_id');
      this.user_role = localStorage.getItem('user_role')?.toLowerCase();
      this.assigned_counsellor_ids = localStorage.getItem('counsellor_ids') || 0;

      this.permissions=localStorage.getItem('decodedToken')
      
      let accesspermissions=JSON.parse(this.permissions).permissions.find((perm:any)=>perm.menu_name==='Allocations')
      accesspermissions?.children_status.forEach((element:any) => {
        if(element.menu_name=='Bulk Upload'){
          this.bulk_Upload=element.access_status;
         
        }
    })}
  
   
  openBottomSheet(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      disableClose: true
    };
    this._bottomSheet.open(AddNewLeadComponent,config);
   
  }
  onChangeSorting(event:any){
    this.sorting = true
     this.sortingType = event
    
      if(this.leadFilter){
        this.query  = ""
        this._addLeadEmitter.leadFilter.subscribe((res) => {
          if (res) {
            this.query = `${res}&filter_by=${this.sortingType}`
            if (['counsellor','counselor'].includes(this.user_role) === true) {
              this.query += `&counsellor_id=${this.user_id}`;
            } else if (['superadmin','super admin'].includes(this.user_role) === true) {
             if(this.assigned_counsellor_ids){
                this.query += `&counsellor_id=${this.assigned_counsellor_ids}`;
              }
            }else if (['admin'].includes(this.user_role) === true){
             if(this.assigned_counsellor_ids){
                this.query += ``;
              }else{
                this.query += ``;
              }
              
            }
            if (this.searchTerm) {
              this.query += `&key=${this.searchTerm}`;
            }
          }
        });
        this._baseService.getData(`${this.query}`).subscribe((res: any) => {
          if (res.results.data) {
            this.leadCards = res.results.data;
            this.leadAllIds = res.results.lead_ids
            this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
            this.totalNumberOfRecords = res.total_no_of_record
          }
        }, (error: any) => {
          this.api.showError(this.api.toTitleCase(error.error.message));
        });

      }else{
        this.query = `?filter_by=${this.sortingType}&page=1&page_size=10&user_type=allocation`
        if (['counsellor','counselor'].includes(this.user_role) === true) {
         this.query += `&counsellor_id=${this.user_id}`;
       } else if (['superadmin','super admin'].includes(this.user_role) === true) {
        if(this.assigned_counsellor_ids){
           this.query += `&counsellor_id=${this.assigned_counsellor_ids}`;
         }
       }else if (['admin'].includes(this.user_role) === true){
        if(this.assigned_counsellor_ids){
           this.query += `&admin_id=${this.user_id}&counsellor_id=${this.assigned_counsellor_ids}`;
         }
         
       }

       if (this.searchTerm) {
              this.query += `&key=${this.searchTerm}`;
        }
        this.allLeadCardsDataSource = []
       this._baseService.getData(`${environment.lead_list}${this.query}`).subscribe((res: any) => {
        if (res.results.data) {
          this.leadCards = res.results.data;
          this.leadAllIds = res.results.lead_ids
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record
        }
      }, (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      });
      }
     
  }
  uploadLeads(): void{
    
    const dialogRef = this.dialog.open(LeadUploadComponent, {
      width:'37%',
      height:'64%',
      // data:{data:this.selectedLeads,name:'BULK'},
    });
    dialogRef.disableClose=true


  
    dialogRef.afterClosed().subscribe((result:any) => {});
  }
  ngOnInit(): void {
  
      this.getStatus()
      this._addLeadEmitter.triggerGet$.subscribe(() => {
        this.searchTerm=''
        
        this._addLeadEmitter.leadFilter.subscribe((res) => {
          if (res) {
            this.leadFilter = true;
            this._addLeadEmitter.leadFilterIcon.next('true')
            this.filterLeads(res);
          }else{
            this.getLeadData('tabLabel')
          }
        });
        this._addLeadEmitter.goBack.next(true)
      });
    
    this._addLeadEmitter.leadFilter.subscribe((res) => {
      if (res) {
        this.leadFilter = true;
        this.filterLeads(res);
      }else{
        this.getLeadData('tabLabel')
      }
    });
    
  }
  
  applySearch(event:any){
    
    if(event !==''){
    this.searchTerm = event
    let query: string;
    query = `${environment.lead_list}?page=1&page_size=${this.pageSize}&user_type=allocation&key=${event}`
    
    if (['counsellor','counselor'].includes(this.user_role) === true) {
      query += `&counsellor_id=${this.user_id}`;
    } else if (['superadmin','super admin'].includes(this.user_role) === true) {
     if(this.assigned_counsellor_ids){
        query += `&counsellor_id=${this.assigned_counsellor_ids}`;
      }
    }else if (['admin'].includes(this.user_role) === true){
     if(this.assigned_counsellor_ids && !this.leadFilter){
        query += `&admin_id=${this.user_id}&counsellor_id=${this.assigned_counsellor_ids}`;
      }
      
    }
      if (this.sorting) {
        query += `&filter_by=${this.sortingType}`;
      }
        if(this.leadFilter){
          this._addLeadEmitter.leadFilter.subscribe((res) => {
            if (res) {
              query = ''
              query = `${res}&user_type=allocation&key=${event}`
              if (['counsellor','counselor'].includes(this.user_role) === true) {
                query += `&counsellor_id=${this.user_id}`;
              } else if (['superadmin','super admin'].includes(this.user_role) === true) {
               if(this.assigned_counsellor_ids){
                  query += ``;
                }
              }else if (['admin'].includes(this.user_role) === true){
               if(this.assigned_counsellor_ids){
                  query += ``;
                }
                
              }
              
            }
          });
        
      }
      this.leadCards = []
      this.allLeadCardsDataSource = []
      this.totalNumberOfRecords = ''
   if(!this.allLeadCardsDataSource.length)
    this._baseService.getData(`${query}`).subscribe((res: any) => {
      if (res.results.data) {
        
        this.leadCards = res.results.data;
        this.leadAllIds = res.results.lead_ids
        this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
        this.totalNumberOfRecords = res.total_no_of_record
      }
    }, (error: any) => {
       this.api.showError(this.api.toTitleCase(error.error.message));
    });
  }else{
   
      this.searchTerm = ''
      let query: string;
      query = `${environment.lead_list}?page=1&page_size=${this.pageSize}&user_type=allocation`
      
      if (['counsellor','counselor'].includes(this.user_role) === true) {
        query += `&counsellor_id=${this.user_id}`;
      } else if (['superadmin','super admin'].includes(this.user_role) === true) {
       if(this.assigned_counsellor_ids){
          query += `&counsellor_id=${this.assigned_counsellor_ids}`;
        }
      }else if (['admin'].includes(this.user_role) === true){
       if(this.assigned_counsellor_ids && !this.leadFilter){
          query += `&admin_id=${this.user_id}&counsellor_id=${this.assigned_counsellor_ids}`;
        }
        
      }
        if (this.sorting) {
          query += `&filter_by=${this.sortingType}`;
        }
        
          if(this.leadFilter){
            this._addLeadEmitter.leadFilter.subscribe((res) => {
              if (res) {
                query = ''
                console.log(query)
                query = `${res}&user_type=allocation`
                if (['counsellor','counselor'].includes(this.user_role) === true) {
                  query += `&counsellor_id=${this.user_id}`;
                } else if (['superadmin','super admin'].includes(this.user_role) === true) {
                    query += query;
                }else if (['admin'].includes(this.user_role) === true){
                    query += query;
                }
                
              }
            });
          }
        
        this.leadCards = []
        this.allLeadCardsDataSource = []
        this.totalNumberOfRecords = ''
     if(!this.allLeadCardsDataSource.length)
      this._baseService.getData(`${query}`).subscribe((res: any) => {
        if (res.results.data) {
          
          this.leadCards = res.results.data;
          this.leadAllIds = res.results.lead_ids
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record
        }
      }, (error: any) => {
         this.api.showError(this.api.toTitleCase(error.error.message));
      });
    }
  
  
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
    this.leadCards = []
    this.totalNumberOfRecords = 0
    this.allLeadCardsDataSource = []
    if(!this.allLeadCardsDataSource.length){
      console.log('apiUrl:',apiUrl)
      if(this.sorting){
        apiUrl += `&filter_by=${this.sortingType}`
      }
     
      this._baseService.getData(`${apiUrl}`).subscribe((res:any) => {
        if(res.results.data){
        this.leadFilter = true
        this.leadCards = res.results.data;
        this.leadAllIds = res.results.lead_ids
        this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
        this.totalNumberOfRecords = res.total_no_of_record
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }));
    }
   
 
   }
   getLeadData(tabLabel: any,filter?:any) {
   
    let apiUrl = `${environment.lead_list}?page=${this.currentPage}&page_size=${this.pageSize}&user_type=allocation`;
   
    if (['counsellor','counselor'].includes(this.user_role) === true) {
      apiUrl += `&counsellor_id=${this.user_id}`;
    } else if (['superadmin','super admin'].includes(this.user_role) === true) {
     apiUrl += ``;
    }else if (['admin'].includes(this.user_role) === true){
     if(this.assigned_counsellor_ids){
        apiUrl += `&admin_id=${this.user_id}&counsellor_id=${this.assigned_counsellor_ids}`;
      }
      
    }
    
    if (tabLabel !== 'tabLabel' && tabLabel.tab.textLabel !== 'All') {
      let tabId = this.statusArray.find((f:any)=>f.name === tabLabel.tab.textLabel)
      apiUrl += `&status=${tabId.id}`;
    }
  
  
    this._baseService.getData(apiUrl).subscribe(
      (res: any) => {

        if (res.results.data) {
          this.allLeadCardsDataSource = []
          this.leadCards = []
          this.totalNumberOfRecords = 0
          this.leadCards = res.results.data;
         
          this.leadAllIds = res.results.lead_ids;
          
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          
          this.totalNumberOfRecords = res.total_no_of_record;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
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
    
    query = `?page=${this.currentPage}&page_size=${event.pageSize}&user_type=allocation`;

    if (['counsellor','counselor'].includes(this.user_role) === true) {
      query += `&counsellor_id=${this.user_id}`;
    } else if (['superadmin','super admin'].includes(this.user_role) === true) {
     if(this.assigned_counsellor_ids){
        query += ``;
      }
    }else if (['admin'].includes(this.user_role) === true){
     if(this.assigned_counsellor_ids && !this.leadFilter){
        query += `&admin_id=${this.user_id}&counsellor_id=${this.assigned_counsellor_ids}`;
      }
      
    }

    

    
    if (type === 'All') {
      query = query;
  
      if (this.sorting) {
        query += `&filter_by=${this.sortingType}`;
      } if (this.searchTerm) {
        query += `&key=${this.searchTerm}`;
      }
     
        if(this.leadFilter){
          this._addLeadEmitter.filterWithPageSize.subscribe((res:any) => {
            if (res) {
             
              query += res
            
            }
          });
      }
    } 
    else {
      query = `?status=${type}&page=${this.currentPage}&page_size=${event.pageSize}&user_type=allocation`;
      if (['counsellor','counselor'].includes(this.user_role) === true) {
        query += `&counsellor_id=${this.user_id}`;
      } else if (['superadmin','super admin'].includes(this.user_role) === true) {
       if(this.assigned_counsellor_ids){
          query += ``;
        }
      }else if (['admin'].includes(this.user_role) === true){
       if(this.assigned_counsellor_ids && !this.leadFilter){
          query += `&admin_id=${this.user_id}&counsellor_id=${this.assigned_counsellor_ids}`;
        }
        
      }
      if (this.sorting) {
        query += `&filter_by=${this.sortingType}`;
      }
      if(this.leadFilter){
        this._addLeadEmitter.filterWithPageSize.subscribe((res:any) => {
          if (res) {
            query += res;
            
          }
        });
      
    }
    if (this.searchTerm) {
     this.query += `&key=${this.searchTerm}`;
    }
    }

   
    
    this._baseService.getData(`${environment.lead_list}${query}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.leadCards = res.results.data;
          this.leadAllIds = res.results.lead_ids;
          
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          this.totalNumberOfRecords = res.total_no_of_record;
        }
      },
      (error: any) => {
        this.api.showError(error.error.error.message);
      }
    );
    
  }
 
   delete(event:any){
   if(event){
    this.getLeadData('tabLabel')
   }
   
   }
  
  reLoad(event:any){
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalNumberOfRecords = 0
    this.allLeadCardsDataSource = []
    this._addLeadEmitter.leadFilter.next('')
    this._addLeadEmitter.leadFilterIcon.next('false')
    this.leadFilter = false;
    this._addLeadEmitter.leadFilter.next('')
    this._addLeadEmitter.selectedFilter.next('')
    this.searchTerm = '';
    this.getStatus()
    this.getLeadData('tabLabel')
    this._addLeadEmitter.leadRefresh.next(true)
  }
}
