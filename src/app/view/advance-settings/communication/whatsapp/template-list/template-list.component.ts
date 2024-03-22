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
import { environment } from 'src/environments/environment';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { WhatsappTemplateDuplicateComponent } from '../whatsapp-template-duplicate/whatsapp-template-duplicate.component';
import { WhatsappViewTemplateComponent } from '../whatsapp-view-template/whatsapp-view-template.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements AfterViewInit  {
  displayedColumns: string[] = [
    'template_name',
    // 'subject',
    'message',

    'Action',


  ]
  params:any=null;


  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allTemplate:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService, private emit:EmitService) {
      
  }
  ngOnInit(): void {
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getTemplate(); 
          localStorage.removeItem('whatsappFilter')
        }
      }
    )
    this.emit.getRefreshByFilter.subscribe(
      (resp:any)=>{
       
          this.params=resp
          localStorage.removeItem('whatsappFilter')
          this.getTemplate(); 

          
        
      }
    )
  }
  ngAfterViewInit() {

    this.getTemplate(); 
    this.dataSource.paginator = this.paginator;
   
  }
  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getTemplate()
    }
   
  }
  search(){
    if(this.searchValue?.length>0){
    this.api.getWhatsappTemplateSearch(this.searchValue,this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
      this.allTemplate= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allTemplate);
      this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
      
    },(error:any)=>{
    this.api.showError(error.error.message)
    }

    )
  }}
  getTemplate(){
    if(this.params!=null){
      this.api.getWhatsappTemplate(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
        //console.log(resp.results);
        this.allTemplate= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allTemplate);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
         this.api.showError(error.error.message)
        
      }
  
      )
    }
    else{
      this.api.getWhatsappTemplate(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
        //console.log(resp.results);
        this.allTemplate= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allTemplate);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
         this.api.showError(error.error.message)
        
      }
  
      )
    }


  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    if(this.searchValue?.length>0){
     this.search()
    }else{
      if(this.params!=null){
        this.api.getWhatsappTemplate(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
          this.allTemplate= resp.results;
          this.dataSource = new MatTableDataSource<any>(this.allTemplate);
          this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
          
        },(error:any)=>{
           this.api.showError(error.error.message)
          
        }
    
        )
      }
      else{
        this.api.getWhatsappTemplate(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
          this.allTemplate= resp.results;
          this.dataSource = new MatTableDataSource<any>(this.allTemplate);
          this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
          
        },(error:any)=>{
           this.api.showError(error.error.message)
          
        }
    
        )
      }
    }
    
  }


  openFilter(){
    const dialogRef = this.dialog.open(WhatsappFilterComponent, {
      width: '50%',
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openCreateTemplate(){
    const dialogRef = this.dialog.open(CreateTemplateComponent, {
      width: '50%',
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openEdit(id:any){
    const dialogRef = this.dialog.open(EditTemplateComponent, {
      width:'35%',
      data:id
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openView(id:any){
    const dialogRef = this.dialog.open(WhatsappViewTemplateComponent, {
      width:'35%',
      data:id
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openDuplicateTemplate(data:any){
    const dialogRef = this.dialog.open(WhatsappTemplateDuplicateComponent, {
      width:'35%',
      data: data
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  baseurl= environment.live_url;
  openDelete(id:any){
    const apiUrl = `${this.baseurl}/api/template/${id}/`;
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'35%',
      data:apiUrl
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }

  
}
