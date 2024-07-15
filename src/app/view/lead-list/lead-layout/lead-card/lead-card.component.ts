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
import { DataService } from 'src/app/service/data.service';

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
    private emit:EmitService,
    private dialog:MatDialog,
    private dataService:DataService) {
      this.user_id = localStorage.getItem('user_id');
      this.user_role = localStorage.getItem('user_role')?.toLowerCase();
      this.assigned_counsellor_ids = localStorage.getItem('counsellor_ids')
      // this.getLeadIds();

      this.permissions=localStorage.getItem('decodedToken')
      //console.log(this.permissions,"this.permissions");
      
      //console.log(JSON.parse(this.permissions).permissions.find((perm:any)=>perm.menu_name==='Allocations'),"this.permissions");
      
      let accesspermissions=JSON.parse(this.permissions).permissions.find((perm:any)=>perm.menu_name==='Allocations')
      accesspermissions?.children_status.forEach((element:any) => {
        if(element.menu_name=='Bulk Upload'){
          this.bulk_Upload=element.access_status;
          //console.log(this.bulk_Upload,"this.bulk_Upload");
          
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
    
    //  this.query = (this.user_role === 'counsellor')
    //   ? `?counsellor_id=${this.user_id}&filter_by=${this.sortingType}&page=1&page_size=${this.pageSize}`
    //   : `?filter_by=${this.sortingType}&page=1&page_size=${this.pageSize}`;
      
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
        this.query = `?filter_by=${this.sortingType}&page=1&page_size=${this.pageSize}&user_type=allocation`
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
  
      // this.getLeadIds()
      this.getStatus()
      this._addLeadEmitter.triggerGet$.subscribe(() => {
        this.searchTerm=''
        
        // this.getLeadIds()
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
      //  console.log(res, "RES");
        this.leadFilter = true;
        this.filterLeads(res);
      }else{
        this.getLeadData('tabLabel')
      }
    });
    
  }
  
  applySearch(event:any){
    this.searchTerm = event
    if(event !==''){
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
      else{
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
    let query: string;
    // query = (this.user_role === 'counsellor')
    // ? `${environment.lead_list}?counsellor_id=${this.user_id}&page=${this.currentPage}&page_size=${this.pageSize}`
    // : `${environment.lead_list}?page=${this.currentPage}&page_size=${this.pageSize}`;
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
      else{
        if(this.leadFilter){
          this._addLeadEmitter.leadFilter.subscribe((res) => {
            if (res) {
              query = ''
              // query = (this.user_role === 'counsellor')
              // ? `${res}&counsellor_id=${this.user_id}&key=${event}`
              // : `${res}&key=${event}`;
              query = `${res}&user_type=allocation`
              if (['counsellor','counselor'].includes(this.user_role) === true) {
                query += `&counsellor_id=${this.user_id}`;
              } else if (['superadmin','super admin'].includes(this.user_role) === true) {
               if(this.assigned_counsellor_ids){
                  query += ``;
                }
              }else if (['admin'].includes(this.user_role) === true){
               if(this.assigned_counsellor_ids){
                  query += ``;
                }else{
                  query += ``;
                }
                
              }
            }
          });
        }
      }
      this.leadCards = []
        this.allLeadCardsDataSource = []
        this.totalNumberOfRecords = ''
      if(!this.allLeadCardsDataSource.length){
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
    this.leadCards = [];
    this.totalNumberOfRecords = [];
    this.allLeadCardsDataSource = [];
    let apiUrl = `${environment.lead_list}?page=1&page_size=${this.pageSize}&user_type=allocation`;
   
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
    this.allLeadCardsDataSource = []
    this.leadCards = []
    this.totalNumberOfRecords = 0
   if(!this.allLeadCardsDataSource.length){
    this._baseService.getData(apiUrl).subscribe(
      (res: any) => {
        if (res.results.data) {
          this.leadCards = res.results.data;
          // console.log(res.results.data,"res.results.data");
          
          
          this.leadAllIds = res.results.lead_ids;
          // console.log(this.leadAllIds, res.results.lead_ids,"this.leadAllIds");
          
          this.allLeadCardsDataSource = new MatTableDataSource<any>(this.leadCards);
          // console.log( this.allLeadCardsDataSource," this.allLeadCardsDataSource");
          
          this.totalNumberOfRecords = res.total_no_of_record;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
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
      } else if (this.searchTerm) {
        query += `&key=${this.searchTerm}`;
      }
     
        else if(this.leadFilter){
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
      }else{
        if(this.leadFilter){
          this._addLeadEmitter.filterWithPageSize.subscribe((res:any) => {
            if (res) {
              query += res;
              
            }
          });
        }
      }
    }

    
    
    this._baseService.getData(`${environment.lead_list}${query}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.leadCards = res.results.data;
          this.leadAllIds = res.results.lead_ids;
          console.log(this.leadAllIds,"this.leadAllIds");
          
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
    //console.log(event,'EVENT')
  }
   delete(event:any){
   if(event){
    this.getLeadData('tabLabel')
   }
   
   }
  
  reLoad(event:any){
    this._addLeadEmitter.leadFilter.next('')
    this._addLeadEmitter.leadFilterIcon.next('false')
    this.leadFilter = false;
    this._addLeadEmitter.leadFilter.next('')
    this._addLeadEmitter.selectedFilter.next('')
    this.getStatus()
    this.getLeadData('tabLabel')
    this._addLeadEmitter.leadRefresh.next(true)
  }
}
