import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AddLevelOfProgramComponent } from '../add-level-of-program/add-level-of-program.component';
import { EditLevelOfProgramComponent } from '../edit-level-of-program/edit-level-of-program.component';
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
  selector: 'app-level-of-program-list',
  templateUrl: './level-of-program-list.component.html',
  styleUrls: ['./level-of-program-list.component.css']
})
export class LevelOfProgramListComponent implements AfterViewInit {
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
  
  allLevel:any=[]
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
          this.getLevel(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getLevel(); 
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }

  applyFilter(event: any) {
    this.api.getLevelOfProgramSearch(event.target.value,this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allLevel= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allLevel);
      this.totalPageLength=resp.total_no_of_record
    this.dataSource.sort = this.sort;
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  getLevel(){
    this.api.getLevelOfProgram(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allLevel= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allLevel);
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
    
    this.api.getLevelOfProgram(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allLevel= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allLevel);
      this.totalPageLength=resp.total_no_of_record
      console.log(this.dataSource);
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddLevelOfProgramComponent, {
      width:'35%'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditLevelOfProgramComponent, {
      width:'35%',
      data:id
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/level-of-program/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  
  
 
 
}
