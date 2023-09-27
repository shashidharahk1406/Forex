import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileFilterComponent } from '../user-profile-filter/user-profile-filter.component';
import { DisableChatComponent } from '../disable-chat/disable-chat.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ReplaceUserComponent } from '../replace-user/replace-user.component';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { EditUserProfileListComponent } from '../edit-user-profile-list/edit-user-profile-list.component';
import { ApiService } from 'src/app/service/API/api.service';
import {PageEvent} from '@angular/material/paginator';
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
  selector: 'app-userprofile-settings',
  templateUrl: './userprofile-settings.component.html',
  styleUrls: ['./userprofile-settings.component.css']
})
export class UserprofileSettingsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'status_name',
    'is_active',
    'is_system_value',
    'status_group_id',
    'master_status',

  ]

  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allStatus:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;

  constructor(private dialog: MatDialog, private api:ApiService
    ) {
      
   
      // Create 100 users
  


  }
  ngOnInit(): void {

  }
  ngAfterViewInit() {

    this.getStatus(); 
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
  getStatus(){
    this.api.getStatus(this.pageSize,this.currentPage).subscribe((resp:any)=>{
      console.log(resp.results);
      this.allStatus= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allStatus);
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
      this.allStatus= resp.results;
      this.dataSource = new MatTableDataSource<any>(this.allStatus);
      this.totalPageLength=resp.total_no_of_record
      console.log(this.dataSource);
      
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  
  openReplaceUser(userdata:any){
    const dialogRef = this.dialog.open(ReplaceUserComponent, {
      width:'45%',
      data: { userdata: userdata }

    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openResetPassword(userdata:any){
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '45%',
      data: { userdata: userdata }
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openDisableChat(name:string){
    const dialogRef = this.dialog.open(DisableChatComponent, {
      width:'35%',
      data: {name:name}
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openFilter(){
    const dialogRef = this.dialog.open(UserProfileFilterComponent, {
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openAddUser(){
    const dialogRef = this.dialog.open(AddNewUserComponent, {
      width: '50%',
    })
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  editUserProfile(userdata:any){
    const dialogRef = this.dialog.open(EditUserProfileListComponent, {
      width: '45%',
      data: { userdata: userdata }
    })
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
}
