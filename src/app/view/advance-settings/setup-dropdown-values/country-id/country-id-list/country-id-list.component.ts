import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddCountryComponent } from '../add-country/add-country.component';
import { EditCountryIdComponent } from '../edit-country-id/edit-country-id.component';
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
  selector: 'app-country-id-list',
  templateUrl: './country-id-list.component.html',
  styleUrls: ['./country-id-list.component.css']
})
export class CountryIdListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'is_active',
    'is_system_value',
    'delete'
  ]
  dataSource=new MatTableDataSource<UserData>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  allCountry:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService, private emit:EmitService
    ) {
      

  }
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getCountry(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getCountry(); 
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }
  searchValue:any
  applyFilter(event: any) {
    console.log(event.target.value);
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getCountry()
    }
   
  }
  search(){
    if(this.searchValue?.length>0){
      this.api.getCountrySearch(this.searchValue,this.pageSize,this.currentPage).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allCountry= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCountry);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }}
  getCountry(){
    this.api.getCountry(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allCountry= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allCountry);
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
    
    this.api.getCountry(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allCountry= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allCountry);
      this.totalPageLength=resp.total_no_of_record
      console.log(this.dataSource);
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddCountryComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditCountryIdComponent, {
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
    const apiUrl = `${this.baseurl}/api/country/${id}/`;
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
