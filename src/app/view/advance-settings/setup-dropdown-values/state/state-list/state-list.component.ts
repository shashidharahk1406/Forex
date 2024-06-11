import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddStateComponent } from '../add-state/add-state.component';
import { EditStateComponent } from '../edit-state/edit-state.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';


@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements  AfterViewInit {
  displayedColumns: string[] = [
    'name',
    // 'is_active',
    'created_date_time',
    'country_name',
    'delete'

  ]
  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allState:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService, private emit:EmitService
    ) {}
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getState(); 
          this.searchValue=''
        }
      }
    )
  }
  ngAfterViewInit() {
    this.getState(); 
    this.dataSource.paginator = this.paginator;
  }

  searchValue:any
  
  applyFilter(event: any){
    if(event.target.value==''){
      this.getState()
    }
    this.searchValue=event.target.value
    if(this.searchValue?.length>0){
      this.api.getStateSearch(this.searchValue,this.pageSize,this.currentPage=1).subscribe((resp:any)=>{
        this.allState= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allState);
        this.totalPageLength=resp.total_no_of_record
       this.dataSource.sort = this.sort;
        
      },(error:any)=>{
       this.api.showError(error.error.message)
      }
  
      )
    }}
  getState(){
    this.api.getState(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      this.allState= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allState);
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
      this.applyFilter(this.searchValue)
    }else{
      this.api.getState(this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allState= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allState);
        this.totalPageLength=resp.total_no_of_record
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      }
  
      )
    }
    
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddStateComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditStateComponent, {
      width:'35%',
      data:id
    });
  
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/state/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  
  
  
  
 
 
}
