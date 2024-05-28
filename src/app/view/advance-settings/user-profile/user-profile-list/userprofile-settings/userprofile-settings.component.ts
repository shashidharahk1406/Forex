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
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { DataService } from 'src/app/service/data.service';
import { DeleteUsersComponent } from '../../delete-users/delete-users.component';
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
    'id',
    'first_name',
    'email',
    'mobile_number',
    'role',
    'designation_id',
    'reporting_to_ids',
    'Action',
    // 'is_allow_for_app',
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
role:any;
counsellorId:any;
userId:any=null;

  constructor(
    private dialog: MatDialog, 
    private api:ApiService, 
    private emit:EmitService,private fb:FormBuilder,
    private baseService:BaseServiceService,
    private dataService:DataService
    ) {

      // if (window.performance) {
      
      //     if (performance.navigation.type === 1) {
      //       // This means the page is being hard refreshed
      //       // this.localStorageService.clearLocalStorage();
      //       localStorage.removeItem('userFilter')
      //     }}
this.role=localStorage.getItem('user_role')
this.userId=localStorage.getItem('user_id');
if(this.role!=='counsellor'){
  this.displayedColumns.push('is_allow_for_app')
    
}



  }
  ngOnInit(): void {

    this.searchValue=''
    this.initForm()
    
    this.emit.getRefresh.subscribe(
      (resp:any)=>{
        //console.log(resp,"response in ng oniinit ");
        
        if(resp==true){
          this.getUser(); 
          this.searchValue=''
        }
      }
    )
    this.emit.getRefreshByFilter.subscribe(
      (resp:any)=>{
        //console.log(resp,'filetr url params');
        
       
          this.params=resp
          this.getUser(); 
          this.searchValue=''
          
        
      }
    )

   // console.log( this.dataService.getUsersfiletredFormValues()," this.dataService.getfiletredFormValues()");
   
  
   
    this.dataService.dataUpdated.subscribe((res: any) => {
     // console.log(res, 'filtered');
      this.params = res;
    });


    var data: any =this.dataService.getUsersfiletredFormValues();
    // var resp: any = JSON.parse(data);
    //console.log(data,"data users fileter");
    
    var resp: any = data
    let result=Object.values(data);
   // console.log(result,"result");
    this.params=this.filterUrlConstruction(result);
    // this.getUser()
    

    result.forEach((res:any)=>{
      if(res!==''){
        this.params=true;
      }
      else{
        this.params=null;
      }
    })




  }
  ngAfterViewInit() {

    this.getUser(); 
    this.dataSource.paginator = this.paginator;

  }

  searchValue:any
  applyFilter(event: any) {
    this.searchValue=event.target.value
    if(event.target.value==''){
      this.getUser()
    }
  }


  loading:boolean=true
  search(){
    this.loading=true;
   
   if(this.role==='Admin'){

     if(this.searchValue?.length>0){
      let admin_id=this.userId
      // var role="Admin"
      this.totalPageLength=0
      this.allUser= [];
        this.dataSource = new MatTableDataSource<any>(this.allUser=[]);

      this.api.getUserSearch(this.searchValue,this.pageSize,this.currentPage=1,admin_id).subscribe((resp:any)=>{
       
        //console.log(resp,"search results");
        
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
        //console.log(resp.total_no_of_record,"resp.total_no_of_record in search");
        
      this.dataSource.sort = this.sort;
      this.loading=false
        
      },(error:any)=>{
       this.api.showError(error.error.message)
      }
  
      )
    }}


   else if(this.role==='counsellor'){
    if(this.searchValue?.length>0){
     let counsellor_id=this.userId
      // var role="Admin"
      this.totalPageLength=0
      this.allUser= [];
        this.dataSource = new MatTableDataSource<any>(this.allUser=[]);

      this.api.getUserSearch(this.searchValue,this.pageSize,this.currentPage=1,counsellor_id).subscribe((resp:any)=>{
       
        console.log(resp,"search results");
        
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);
        this.totalPageLength=resp.total_no_of_record
        console.log(resp.total_no_of_record,"resp.total_no_of_record in search");
        
      this.dataSource.sort = this.sort;
      this.loading=false
        
      },(error:any)=>{
       this.api.showError(error.error.message)
      }
  
      )
    }
    }

    else{
      
      if(this.searchValue?.length>0){
        if(this.params==null||this.userId==null){
          
        }
        // this.params=this.userId
        // var role="Admin"
        // let admin_id=null
        this.totalPageLength=0
        this.allUser= [];
          this.dataSource = new MatTableDataSource<any>(this.allUser=[]);
  
        this.api.getUserSearch(this.searchValue,this.pageSize,this.currentPage=1,this.params).subscribe((resp:any)=>{
         
          console.log(resp,"search results");
          
          this.allUser= resp.results;
          this.dataSource = new MatTableDataSource<any>(this.allUser);
          this.totalPageLength=resp.total_no_of_record
          console.log(resp.total_no_of_record,"resp.total_no_of_record in search");
          
        this.dataSource.sort = this.sort;
        this.loading=false
          
        },(error:any)=>{
         this.api.showError(error.error.message)
        }
    
        )
      }
    }
   } 


  
    // if(this.searchValue?.length>0){
    //   var role="Admin"
    //   this.totalPageLength=0
    //   this.allUser= [];
    //     this.dataSource = new MatTableDataSource<any>(this.allUser=[]);

    //   this.api.getUserSearch(this.searchValue,this.pageSize,this.currentPage=1,this.params).subscribe((resp:any)=>{
       
    //     console.log(resp,"search results");
        
    //     this.allUser= resp.results;
    //     this.dataSource = new MatTableDataSource<any>(this.allUser);
    //     this.totalPageLength=resp.total_no_of_record
    //     console.log(resp.total_no_of_record,"resp.total_no_of_record in search");
        
    //   this.dataSource.sort = this.sort;
        
    //   },(error:any)=>{
    //    this.api.showError(error.error.message)
    //   }
  
    //   )
    // }}
  // getUser(){
  //   console.log("Hello", this.params);
  //   if(this.role==='Admin'){
      
  //   }
    
  //   var role="Admin"
  //   //console.log("ppp");
  //   if(this.params!=null){
  //     this.api.getUser(this.pageSize,this.currentPage,this.params,).subscribe((resp:any)=>{
  //       console.log(resp.results,"users response");
  //       this.allUser= resp.results;
        
  //       this.dataSource = new MatTableDataSource<any>(this.allUser);
  //       this.totalPageLength=resp.total_no_of_record
  //     this.dataSource.sort = this.sort;
        
  //     },(error:any)=>{
  //       this.api.showError(error.error.message)
        
  //     }
  
  //     )
  //   }
  //   else{
  //     // if()
  //     console.log("coming to else", this.params);
      
  //     this.api.getUser(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
  //       console.log("==>>",resp.results);
  //       this.allUser= resp.results;
  //       this.dataSource = new MatTableDataSource<any>(this.allUser);

  //       console.log("datasource", this.dataSource);
        
  //       this.totalPageLength=resp.total_no_of_record
  //     this.dataSource.sort = this.sort;

      
        
  //     },(error:any)=>{
  //       this.api.showError(error.error.message)
        
  //     }
  
  //     )
  //   }

  // }


  getUser(){
    // console.log("Hello", this.params);
    if(this.role==='Admin'){



      if(this.params!=null||this.userId){
        this.api.getUser(this.pageSize,this.currentPage,this.userId,this.params).subscribe((resp:any)=>{
          //console.log(resp.results,"users response");
          this.allUser= resp.results;
          
          this.dataSource = new MatTableDataSource<any>(this.allUser);
          this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
        this.loading=false
          
        },(error:any)=>{
          this.api.showError(error.error.message)
          
        }
    
        )
        }
     
    }
    
    // var role="Admin"
    // //console.log("ppp");
    // if(this.params!=null){
      
    // }
    else if(this.role==='counsellor'){
      try{

         // if()
      //console.log("coming to else", this.params);

      if(this.params!=null || this.userId ){
       
        this.api.getUser(this.pageSize,this.currentPage,this.userId,this.params).subscribe((resp:any)=>{
       //   console.log("==>>",resp.results);
          this.allUser= resp.results;
          this.dataSource = new MatTableDataSource<any>(this.allUser);
  
         // console.log("datasource", this.dataSource);
          
          this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;
        this.loading=false
  
        
          
        },(error:any)=>{
         // console.log(error);
          
          this.api.showError(error.error.message)
          
        }
    
        )
         }
        
      }
      catch(error){
       // console.log(error);
        
      }

     
      
     
    }
    else{
      //  if(this.params!=null)
      this.api.getUser(this.pageSize,this.currentPage,null,this.params).subscribe((resp:any)=>{
        //console.log("==>>",resp.results);
        this.allUser= resp.results;
        this.dataSource = new MatTableDataSource<any>(this.allUser);

        //console.log("datasource", this.dataSource);
        
        this.totalPageLength=resp.total_no_of_record
      this.dataSource.sort = this.sort;
      this.loading=false

      
        
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      }
  
      )
    }

  }
  pageChanged(event: PageEvent) {
    console.log(event,"page event");
    
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    
    if(this.searchValue?.length>0){
      this.search()
    }else{
      if(this.role==='Admin'){
        if(this.params!=null ||this.userId ){
          this.api.getUser(this.pageSize,this.currentPage,this.userId,this.params).subscribe((resp:any)=>{
           // console.log(resp.results,"users response");
            this.allUser= resp.results;
            
            this.dataSource = new MatTableDataSource<any>(this.allUser);
            this.totalPageLength=resp.total_no_of_record
          this.dataSource.sort = this.sort;
          this.loading=false
            
          },(error:any)=>{

            this.api.showError(error.error.message)
            
          }
      
          )
          }
       
      }
      
      // var role="Admin"
      // //console.log("ppp");
      // if(this.params!=null){
        
      // }

      
      else if(this.role==='counsellor'){
        
       // console.log("coming to else", this.params);
        if(this.params!=null ||this.userId ){
          this.api.getUser(this.pageSize,this.currentPage,this.userId,this.params).subscribe((resp:any)=>{
           // console.log("==>>",resp.results);
            this.allUser= resp.results;
            this.dataSource = new MatTableDataSource<any>(this.allUser);
           // console.log("datasource", this.dataSource);
            this.totalPageLength=resp.total_no_of_record
          this.dataSource.sort = this.sort;
          this.loading=false
          },(error:any)=>{
            this.api.showError(error.error.message)
            
          }
      
          )
           }
        
       
      }
      else{
        
        this.api.getUser(this.pageSize,this.currentPage,null,this.params).subscribe((resp:any)=>{
         // console.log("==>>",resp.results);
          this.allUser= resp.results;
          this.dataSource = new MatTableDataSource<any>(this.allUser);
        //  console.log("datasource", this.dataSource);
          this.totalPageLength=resp.total_no_of_record
        this.dataSource.sort = this.sort;  
        this.loading=false
        },(error:any)=>{
          this.api.showError(error.error.message)
          
        }
    
        )
      }
      // if(this.params !=null ){
      //   this.api.getUser(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
      //     //console.log(resp.results);
      //     this.allUser= resp.results;
      //     this.dataSource = new MatTableDataSource<any>(this.allUser);
      //     this.totalPageLength=resp.total_no_of_record
      //     console.log(resp.total_no_of_record,"resp.total_no_of_record in search with pagination");
          
      //   this.dataSource.sort = this.sort;
          
      //   },(error:any)=>{
      //     this.api.showError(error.error.message)
          
      //   }
    
      //   )
        
      // }
      // else{
      //   this.api.getUser(this.pageSize,this.currentPage,this.params).subscribe((resp:any)=>{
      //     this.allUser= resp.results;
      //     this.dataSource = new MatTableDataSource<any>(this.allUser);
      //     this.totalPageLength=resp.total_no_of_record
      //   this.dataSource.sort = this.sort;
          
      //   },(error:any)=>{
      //     this.api.showError(error.error.message)
          
      //   }
    
      //   )
      // }
    }
  }
  
  openReplaceUser(userdata:any){
    const dialogRef = this.dialog.open(ReplaceUserComponent, {
      width:'45%',
      data: { userdata: userdata }

    });

    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    });
  }
  openResetPassword(userdata:any){
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '45%',
      data: { userdata: userdata }
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    });
  }
  openDisableChat(id:any){
    const dialogRef = this.dialog.open(DisableChatComponent, {
      width:'35%',
      data: id
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openPauseUser(id:any){
    //console.log("kkk",id);
    
    const dialogRef = this.dialog.open(PauseUserComponent, {
      width:'35%',
      data:id 
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openFilter(){
    const dialogRef = this.dialog.open(UserProfileFilterComponent, {
      width: '50%',
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  openAddUser(){
    const dialogRef = this.dialog.open(AddNewUserComponent, {
      width: '50%',
    })
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  editUserProfile(userdata:any){
    if((this.role==='Admin' && this.userId===userdata.id) || this.role==='counsellor'){
      return
    }
    const dialogRef = this.dialog.open(EditUserProfileListComponent, {
      width: '45%',
      data: { userdata: userdata }
    })
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
    }); 
  }
  editForm!:FormGroup
  initForm(){
    this.editForm = this.fb.group({
      deactive:["",Validators.required]
    });}
  onSlideToggleChange(id:any,event:any){
    this.editForm.patchValue({deactive:!event.checked})
    this.api.pauseUser(id,this.editForm.value).subscribe(
      (resp:any)=>{
        this.emit.sendRefresh(true)
      },
      (error:any)=>{
       this.api.showError(error.error.message)
      }
    )
  }
    

  
  baseurl= environment.live_url;
  id:any;
  user_name:any;
  openDelete(id:any,name:any){
    this.id=id;
    this.user_name=name;
    //console.log(this.user_name,"username");
    

    const apiUrl = `${this.baseurl}/api/user/${id}/`;
    const dialogRef = this.dialog.open(DeleteUsersComponent, {
      width:'35%',
      // data:{apiUrl,id:this.id,user_name:this.user_name}
      data:apiUrl
    });
    dialogRef.disableClose = true;
  
    dialogRef.afterClosed().subscribe((result:any) => {
    
    });
  }


  somthing(id:any){
    
  }



  
  


  getColor(pause: boolean): string {
    return pause ? 'red' : 'green'; // Change colors as needed
  }

  filterUrlConstruction(formValues:any){
    // const formValues = this.filterForm.value;

    // Create an array of query parameters with non-empty values
    const queryParams = [];
    for (const key in formValues) {
      const value = formValues[key];
      if (value !== '' && value !== undefined) {
        if (Array.isArray(value)) {
          // Handle multi-select fields
          if (value.length > 0) {
            // Convert array of objects to a comma-separated string of IDs
            if (key === 'reporting_to_ids') {
              const ids = value.map((item) => item).join(',');
              queryParams.push(`${key}=[${ids}]`);
            } else {
              const values = value.join(',');
              queryParams.push(`${key}=${values}`);
            }
          }
        } else {
          queryParams.push(`${key}=${value}`);
        }
      }
    }
  
  
    // Construct the API request URL with query parameters
    var apiUrl = `${queryParams.join('&')}`;
    return apiUrl
  }
}
