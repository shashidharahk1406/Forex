import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddSourceComponent } from '../add-source/add-source.component';
import { EditSourceComponent } from '../edit-source/edit-source.component';
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
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.css']
})
export class SourceListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'source_name',
    'is_active',
    'is_system_value',
    'source_id',
    'channel_name',
    'delete'

  ]
  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allSource:any=[]
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
          this.getSource(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getSource(); 
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }
  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getSource()
    }
  }
  search(){
    if(this.searchValue?.length>0){
  this.api.getSourceSearch(this.searchValue,this.pageSize,this.currentPage).subscribe((resp:any)=>{
    console.log(resp.results);
    this.allSource= resp.results;
    this.dataSource = new MatTableDataSource<any>(this.allSource);
    this.totalPageLength=resp.total_no_of_record
  this.dataSource.sort = this.sort;
    
  },(error:any)=>{
    console.log(error);
    
  }

  )}}
  getSource(){
    this.api.getSource(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allSource= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allSource);
      this.totalPageLength=resp.total_no_of_record
    this.dataSource.sort = this.sort;
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    console.log(this.pageSize,this.currentPage);
    
    this.api.getSource(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allSource= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allSource);
      this.totalPageLength=resp.total_no_of_record
      console.log(this.dataSource);
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddSourceComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditSourceComponent, {
      width:'35%',
      data:id
    });
    
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/source/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  
 
 
}
