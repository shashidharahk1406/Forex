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
import { EmitService } from 'src/app/service/emit/emit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PauseUserComponent } from '../pause-user/pause-user.component';
import { error } from 'console';
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
    'first_name',
    'email',
    'mobile_number',
    'role',
    'designation_id',
    'reporting_to_ids',
    'Action',
    'is_allow_for_app',
  ]

  dataSource = new MatTableDataSource<any>;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allUser:any=[]
  pageSize= 10;
  currentPage=1;
  totalPageLength:any;
  params:any=null;
user:any;
  constructor(private dialog: MatDialog, private api:ApiService, private emit:EmitService,private fb:FormBuilder
    ) {

      
   
      // Create 100 users
  


  }
  ngOnInit(): void {
    this.initForm()
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        if(resp==true){
          this.getUser(); 
        }
      }
    )
    this.emit.getRefreshByFilter.subscribe(
      (resp:any)=>{
       
          this.params=resp
          this.getUser(); 
          
        
      }
    )
  }
  ngAfterViewInit() {

    this.getUser(); 
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }

  searchValue:any
  applyFilter(event: any) {
    console.log(event.target.value);
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getUser()
    }
    console.log(event.target.value);

  }
  search(){
    if(this.searchValue?.length>0){
      var role="Admin"
      this.api.getUserSearch(this.searchValue,this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }}
  getUser(){
    var role="Admin"
    console.log("ppp");
    if(this.params!=null){
      this.api.getUser(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }
    else{
      this.api.getUser(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }

  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    console.log(this.pageSize,this.currentPage);
    var role="Admin"
    if(this.params!=null){
      this.api.getUser(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }
    else{
      this.api.getUser(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
        console.log(resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
        
      },(error:any)=>{
        console.log(error);
        
      }
  
      )
    }
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
  openDisableChat(id:any){
    const dialogRef = this.dialog.open(DisableChatComponent, {
      width:'35%',
      data: id
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
  openPauseUser(id:any){
    console.log("kkk",id);
    
    const dialogRef = this.dialog.open(PauseUserComponent, {
      width:'35%',
      data:id 
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
  editForm!:FormGroup
  initForm(){
    this.editForm = this.fb.group({
      deactive:["",Validators.required]
    });}
  onSlideToggleChange(id:any,event:any){
    console.log(id,event.checked);
    console.log(id,event);
    this.editForm.patchValue({deactive:!event.checked})
    this.api.pauseUser(id,this.editForm.value).subscribe(
      (resp:any)=>{
        this.emit.sendRefresh(true)
      },
      (error:any)=>{
        console.log("error");
        
      }
    )
  }
    

  deleteUserProfile(id:any){
    this.api.deleteUser(id).subscribe((res:any)=>{
      this.emit.sendRefresh(true);
      this.api.showSuccess(res.message)

    },(error:any)=>{
      console.log(error);
       this.api.showError(this.api.toTitleCase(error.error.message));
    })
  }

  somthing(id:any){
    console.log('id===',id)
  }

  
}
