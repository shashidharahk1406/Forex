import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { environment } from 'src/environments/environment';
import { EditStageComponent } from '../edit-stage/edit-stage.component';
import { AddStagesComponent } from '../add-stages/add-stages.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { MatSort } from '@angular/material/sort';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

// export interface UserData {
//   'User Name': string,
//   'Email': string,
//   'Mobile': string,
//   'User Role': string,
//   'Designation':string,

// }
@Component({
  selector: 'app-lead-stage-list',
  templateUrl: './lead-stage-list.component.html',
  styleUrls: ['./lead-stage-list.component.css']
})
export class LeadStageListComponent implements OnInit {
  displayedColumns: string[] = [
    'lead_stage_name',
    'is_active',
    'is_system_value',
    // 'delete'
  ]

  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allCourse:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;
  
  data:any = []
  constructor(private dialog: MatDialog, private api:ApiService, private emit:EmitService
    ) {
      this.data = [
        {
          id: 1,
          lead_stage_name: 'Qualified Lead',
          is_active: true,
          is_system_value: true,
        },
        {
          id: 2,
          lead_stage_name: 'Walkin',
          is_active: true,
          is_system_value: true,
        },
        {
          id: 3,
          lead_stage_name: 'Application',
          is_active: true,
          is_system_value: true,
        },
        {
          id: 4,
          lead_stage_name: 'Payment',
          is_active: true,
          is_system_value: true,
        },
        {
          id: 5,
          lead_stage_name: 'Document Verification',
          is_active: true,
          is_system_value: true,
        },
        {
          id: 6,
          lead_stage_name: 'Admission',
          is_active: true,
          is_system_value: true,
        },
        {
          id: 7,
          lead_stage_name: 'Droupout',
          is_active: true,
          is_system_value: true,
        },
      ];
    }
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getLeadStage(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getLeadStage(); 
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }

  searchValue:any
  applyFilter(event: any) {
    console.log(event.target.value);
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getLeadStage()
    }
   
  }
  search(){
    if(this.searchValue?.length>0){
      this.api.getCourseSearch(this.searchValue,this.pageSize,this.currentPage).subscribe((resp:any)=>{
        console.log(resp.results);
        // this.allCourse= resp.results;
        this.allCourse = this.data
        this.dataSource = new MatTableDataSource<any>(this.allCourse);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }}
  getLeadStage(){
    // this.api.getCourse(this.pageSize,this.currentPage).subscribe((resp:any)=>{
    //   console.log(resp.results);
      // this.allCourse= resp.results;
      // this.dataSource = new MatTableDataSource<any>(this.allCourse);
      // this.totalPageLength=resp.total_no_of_record
      this.allCourse= this.data;
      console.log(this.allCourse,"COURSE")
      this.dataSource = new MatTableDataSource<any>(this.allCourse);
      this.totalPageLength=this.data.length
    // this.dataSource.sort = this.sort;
      
    // },(error:any)=>{
    //   console.log(error);
      
    // }

    // )
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    console.log(this.pageSize,this.currentPage);
    
    this.api.getCourse(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      //this.allCourse= resp.results;
      this.allCourse = this.data
      this.dataSource = new MatTableDataSource<any>(this.allCourse);
      this.totalPageLength=resp.total_no_of_record
      console.log(this.dataSource);
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  openAdd(){
    const dialogRef = this.dialog.open(AddStagesComponent, {
      width:'35%'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditStageComponent, {
      width:'35%',
      data:id
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/course/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  
  
  

}
