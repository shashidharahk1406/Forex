import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/service/API/api.service';

export interface UserData {
  'User Name': string,
  'Email': string,
  'Mobile': string,
  'User Role': string,
  'Designation':string,

}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'channel_name',
    'is_active',
    'is_system_value',
  ]
  dataSource=new MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  allChannel:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor( private api:ApiService
    ) {
      

  }
  ngOnInit(){
    
  }
  ngAfterViewInit() {

    this.getChannel(); 
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getChannel(){
    this.api.getChannel(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allChannel= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allChannel);
      this.totalPageLength=resp.total_no_of_record
    this.dataSource.sort = this.sort;
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  
  
  
  
 
 
}
