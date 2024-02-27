import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AddStreamComponent } from '../add-stream/add-stream.component';
import { EditStreamComponent } from '../edit-stream/edit-stream.component';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {
  displayedColumns: string[] = [
    'stream_name',
    'is_active',
    'is_system_value',
    'delete'
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
    ) {
      
   
  }
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getCourse(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getCourse(); 
    this.dataSource.paginator = this.paginator;
   
  }

  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getCourse()
    }
   
  }
  search(){
    if(this.searchValue?.length>0){
      this.baseService.getData(`${environment.studying_stream}?page_size=${this.pageSize}&page=${this.currentPage}&key=${this.searchValue}`).subscribe((resp:any)=>{
        this.allCourse= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCourse);
        this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      }
  
      )
    }}
  getCourse(){
    this.baseService.getData(`${environment.studying_stream}?page_size=${this.pageSize}&page=${this.currentPage}`).subscribe((resp:any)=>{
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
    let query = `?page_size=${this.pageSize}&page=${this.currentPage}`
    if(this.searchValue?.length>0){
      query +=`&key=${this.searchValue}`
    }
    this.baseService.getData(`${environment.studying_stream}?${query}`).subscribe((resp:any)=>{
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
  openAdd(){
    const dialogRef = this.dialog.open(AddStreamComponent, {
      width:'35%'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditStreamComponent, {
      width:'35%',
      data:id
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
 
  openDelete(id:any){
    const apiUrl = `${environment.studying_stream}${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  
}
