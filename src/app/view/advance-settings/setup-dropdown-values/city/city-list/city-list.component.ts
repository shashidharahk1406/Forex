import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { EditCityComponent } from '../edit-city/edit-city.component';
import { AddCityComponent } from '../add-city/add-city.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'is_active',
    'is_system_value',
    'state_name',
    'is_metro_politan',
    'delete'

  ]
  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allCity:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService,private emit:EmitService
    ) {}
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getCity(); 
        }
      }
    )
  }
  ngAfterViewInit() {
    this.getCity(); 
    this.dataSource.paginator = this.paginator; 
  }

  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getCity()
    }

  }
  search(){
    if(this.searchValue?.length>0){
      this.api.getCitySearch(this.searchValue,this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allCity= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCity);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      }
  
      )
    }}
  getCity(){
     this.api.getCity(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      this.allCity= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allCity);
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
      this.api.getCity(this.pageSize,this.currentPage).subscribe((resp:any)=>{
        this.allCity= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allCity);
        this.totalPageLength=resp.total_no_of_record
      },(error:any)=>{
        this.api.showError(error.error.message)
      }
  
      )
    }
   
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddCityComponent, {
      width:'35%'
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditCityComponent, {
      width:'35%',
      data:id
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/city/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  
  
  
 
 
}
