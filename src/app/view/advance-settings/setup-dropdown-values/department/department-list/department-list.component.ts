import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
export interface UserData {
  'User Name': string,
  'Email': string,
  'Mobile': string,
  'User Role': string,
  'Designation':string,

}
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'is_active',
    'is_system_value',
    'level_of_program_name',
    'delete'

  ]
  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allDepartment:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService, private emit:EmitService
    ) {
      
   
      // Create 100 users
  


  }
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getDepartment(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getDepartment(); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  searchValue:any
  applyFilter(event: any) {
    //console.log(event.target.value);
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getDepartment()
    }
    
  }
  search(){
    if(this.searchValue?.length>0){
      this.api.getDepartmentSearch(this.searchValue,this.pageSize,this.currentPage).subscribe((resp:any)=>{
        //console.log(resp.results);
        this.allDepartment= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allDepartment);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        //console.log(error);
        
      }
  
      )
    }}
  getDepartment(){
    this.api.getDepartment(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      //console.log(resp.results);
      this.allDepartment= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allDepartment);
      this.totalPageLength=resp.total_no_of_record
    this.dataSource.sort = this.sort;
      
    },(error:any)=>{
      //console.log(error);
      
    }

    )
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    //console.log(this.pageSize,this.currentPage);
    
    this.api.getDepartment(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      //console.log(resp.results);
      this.allDepartment= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allDepartment);
      this.totalPageLength=resp.total_no_of_record
      //console.log(this.dataSource);
      
    },(error:any)=>{
      //console.log(error);
      
    }

    )
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      width:'35%',
      data:id
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/department/${id}/`;
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
