import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { environment } from 'src/environments/environment';
import { EditStageComponent } from '../edit-stage/edit-stage.component';
import { AddStagesComponent } from '../add-stages/add-stages.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { MatSort } from '@angular/material/sort';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BaseServiceService } from 'src/app/service/base-service.service';


@Component({
  selector: 'app-lead-stage-list',
  templateUrl: './lead-stage-list.component.html',
  styleUrls: ['./lead-stage-list.component.css']
})
export class LeadStageListComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "created_date_time",
    "delete"
  ]

  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allCourse:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;
  
  
  constructor(
    private dialog: MatDialog, 
    private api:ApiService, 
    private emit:EmitService,
    private baseService:BaseServiceService
    ) {}
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getLeadStage(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getLeadStage(); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getLeadStage()
    }
   
  }
  search(){
    if(this.searchValue?.length>0){
      this.allCourse= []
      this.dataSource = new MatTableDataSource<any>(this.allCourse=[]);
      this.totalPageLength=0
      this.baseService.getData(`${environment.leadStage}/?key=${this.searchValue}&page_size=${this.pageSize}&page=${this.currentPage=1}`).subscribe((resp:any)=>{
        this.allCourse= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCourse);
        this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        this.api.showError(error.error.message)
      }
  
      )
    }}
  getLeadStage(){
    this.baseService.getData(`${environment.leadStage}?page_size=${this.pageSize}&page=${this.currentPage}`).subscribe((resp:any)=>{
      if(resp.results){
        this.allCourse= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCourse);
        this.totalPageLength=resp.total_no_of_record
       this.dataSource.sort = this.sort;
      } 
    },(error:any)=>{
      this.api.showError(error.error.message)
    }

    )
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    if(this.searchValue?.length>0){
      this.search()
     }else{
      this.baseService.getData(`${environment.leadStage}/?page_size=${this.pageSize}&page=${this.currentPage}`).subscribe((resp:any)=>{
        this.allCourse= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCourse);
        this.totalPageLength=resp.total_no_of_record
      },(error:any)=>{
       this.api.showError(error.error.message)
      }
  
      )
     }
  
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddStagesComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  openEdit(selectedData:any){
    const dialogRef = this.dialog.open(EditStageComponent, {
      width:'35%',
      data:selectedData
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${environment.leadStage}${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  
  
  

}
