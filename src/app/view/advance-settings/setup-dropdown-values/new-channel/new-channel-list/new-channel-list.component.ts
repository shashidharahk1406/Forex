import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddNewChannelComponent } from '../add-new-channel/add-new-channel.component';
import { EditChannelComponent } from '../../channel/edit-channel/edit-channel.component';
import { EditNewChannelComponent } from '../edit-new-channel/edit-new-channel.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';


@Component({
  selector: 'app-new-channel-list',
  templateUrl: './new-channel-list.component.html',
  styleUrls: ['./new-channel-list.component.css']
})
export class NewChannelListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'new_channel_name',
    'is_active',
    'is_system_value',
    'delete'
  ]
  dataSource=new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  allChannel:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService,private emit:EmitService
    ) {}
  ngOnInit(){
  this.emit.getRefresh.subscribe(
    (resp:any)=>{
      if(resp==true){
        this.getChannel(); 
      }
    }
  )
}
  ngAfterViewInit() {

    this.getChannel(); 
    this.dataSource.paginator = this.paginator;
   
  }
  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getChannel()
    }
    
  }
  search(){
    if(this.searchValue?.length > 0){
      this.api.getNewChannelSearch(this.searchValue,this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allChannel= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allChannel);
        this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
        
        },(error:any)=>{
          this.api.showError(error.error.message)
        }
    
        )
    }
    
  }
  getChannel(){
    this.api.getNewChannel(this.pageSize,this.currentPage).subscribe((resp:any)=>{
    this.allChannel= resp.results;
    this.dataSource = new MatTableDataSource<any>(this.allChannel);
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
    if(this.searchValue?.length > 0){
      this.search()
    }else{
      this.api.getNewChannel(this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allChannel= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allChannel);
        this.totalPageLength=resp.total_no_of_record
      },(error:any)=>{
        this.api.showError(error.error.message)
      }
  
      )
    }
    
   
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddNewChannelComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditNewChannelComponent, {
      width:'35%',
      data:id
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/new-channel/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  
  
 
 
}
