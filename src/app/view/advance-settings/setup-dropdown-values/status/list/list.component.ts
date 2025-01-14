import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { environment } from 'src/environments/environment';
import { BaseServiceService } from 'src/app/service/base-service.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    // 'is_active',
    // 'is_system_value',
    'created_date_time',
    'delete'
  ]

  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allStatus:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(
    private dialog: MatDialog, 
    private api:ApiService, 
    private emit:EmitService,
    private baseService:BaseServiceService) {}
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.searchValue=''
          this.getStatus(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getStatus(); 
    this.dataSource.paginator = this.paginator;

  }
  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getStatus()
    }
  }
  search(){
    if(this.searchValue?.length>0){
      this.allStatus=[]
      this.dataSource = new MatTableDataSource<any>(this.allStatus=[]);
      this.totalPageLength=0
      this.api.getStatusSearch(this.searchValue,this.pageSize,this.currentPage=1).subscribe((resp:any)=>{
        this.allStatus= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allStatus);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      }
  
      )
    }
  }
  getStatus(){
    this.api.getStatus(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      //console.log(resp.results);
      this.allStatus= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allStatus);
      this.totalPageLength=resp.total_no_of_record
    this.dataSource.sort = this.sort;
      
    },(error:any)=>{
      this.api.showError(error.error.message)
      
    }

    )
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    
      if(this.searchValue?.length>0){
        this.api.getStatusSearch(this.searchValue,this.pageSize,this.currentPage=1).subscribe((resp:any)=>{
          this.allStatus= resp.results;
          this.dataSource = new MatTableDataSource<any>(this.allStatus);
          this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
          
        },(error:any)=>{
          this.api.showError(error.error.message)
          
        }
    
        )
      }else{
      this.api.getStatus(this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allStatus= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allStatus);
        this.totalPageLength=resp.total_no_of_record 
      },(error:any)=>{
        this.api.showError(error.error.message)
      }
      
      )
    }
   
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditComponent, {
      width:'35%',
      data:id
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/lead-list-status/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  
  
  
 
 
}
