import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddPriorityNameComponent } from '../add-priority-name/add-priority-name.component';
import { EditPriorityNameComponent } from '../edit-priority-name/edit-priority-name.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-priority-name-list',
  templateUrl: './priority-name-list.component.html',
  styleUrls: ['./priority-name-list.component.css']
})
export class PriorityNameListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    // 'is_active',
    'created_date_time',
    'delete'

  ]
  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allPriority:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService,private emit:EmitService
    ) { }
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getPriority(); 
          this.searchValue=''
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getPriority(); 
    this.dataSource.paginator = this.paginator;
    
  }

  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getPriority();
      this.searchValue=''
    }
   
   
  }
  search(){
    if(this.searchValue?.length>0){
      this.api.getPrioritySearch(this.searchValue,this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allPriority= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allPriority);
        this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
        
      },(error:any)=>{
       this.api.showError(error.error.message)
      }
  
      )
    }}
  getPriority(){
    this.api.getPriority(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      this.allPriority= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allPriority);
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
      this.search()
    }else{
      this.api.getPriority(this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allPriority= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allPriority);
        this.totalPageLength=resp.total_no_of_record
       
      },(error:any)=>{
        this.api.showError(error.error.message)
      }
  
      )
    }
  
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddPriorityNameComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditPriorityNameComponent, {
      width:'35%',
      data:id
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/priority/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  
  
  
 
 
}
