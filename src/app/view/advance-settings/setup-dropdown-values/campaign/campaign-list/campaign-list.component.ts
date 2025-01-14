import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddCampaignComponent } from '../add-campaign/add-campaign.component';
import { EditCampaignComponent } from '../edit-campaign/edit-campaign.component';
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
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements  AfterViewInit {
  displayedColumns: string[] = [
    'campaign_name',
    // 'is_active',
    // 'is_system_value',
    'source_name',
    'delete'

  ]
  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allCampaign:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService,private emit:EmitService
    ) {
      
   
      // Create 100 users
  


  }
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getCampaign(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getCampaign(); 
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }
  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getCampaign()
    }
    
  }
  search(){
    if(this.searchValue?.length>0){
      this.api.getCampignSearch(this.searchValue,this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allCampaign= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCampaign);
        this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        this.api.showError(error.error.message) 
      }
  
      )
    }}
  getCampaign(){
    this.api.getCampign(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      //console.log(resp.results);
      this.allCampaign= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allCampaign);
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
    if(this.searchValue?.length>0){
      this.search()
    }else{
      this.api.getCampign(this.pageSize,this.currentPage).subscribe((resp:any)=>{ 
        this.allCampaign= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCampaign);
        this.totalPageLength=resp.total_no_of_record
       
      },(error:any)=>{
        this.api.showError(error.error.message) 
        
      }
  
      )
    }
    
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddCampaignComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditCampaignComponent, {
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
    const apiUrl = `${this.baseurl}/api/campaign/${id}/`;
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
