import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MediaMatcher} from '@angular/cdk/layout';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { WhatsappFilterComponent } from '../whatsapp-filter/whatsapp-filter.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
import { EmitService } from 'src/app/service/emit/emit.service';
import { CreateTemplateComponent } from '../create-template/create-template.component';
import { EditTemplateComponent } from '../edit-template/edit-template.component';
export interface UserData {
  'User Name': string,
  'Email': string,
  'Mobile': string,
  'User Role': string,
  'Designation':string,
  'Reporting To':string,
  'User Status':string,
  'Action':string
}
@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements AfterViewInit  {
  displayedColumns: string[] = [
    'template_name',
    // 'subject',
    'template_type_id',
    'status',
    'Action',

  ]

  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allTemplate:any=[]
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
          this.getTemplate(); 
        }
      }
    )
  }
  ngAfterViewInit() {

    this.getTemplate(); 
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
  getTemplate(){
    this.api.getWhatsappTemplate(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allTemplate= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allTemplate);
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
    
    this.api.getStatus(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allTemplate= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allTemplate);
      this.totalPageLength=resp.total_no_of_record
      console.log(this.dataSource);
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }


  openFilter(){
    const dialogRef = this.dialog.open(WhatsappFilterComponent, {
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openCreateTemplate(){
    const dialogRef = this.dialog.open(CreateTemplateComponent, {
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditTemplateComponent, {
      width:'35%',
      data:id
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }

}
