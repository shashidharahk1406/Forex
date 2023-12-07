import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../service/API/api.service';
import { BaseServiceService } from '../service/base-service.service';
import { environment } from 'src/environments/environment';

export interface PaymentData {
  razorpay_payment_id: string;
  email: string;
  mobile_number: string;
  created_date_time: string;
  status: string;
}

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  displayedColumns: string[] = ['razorpay_payment_id',  'email', 'mobile_number', 'created_date_time', 'status'];
  dataSource!: MatTableDataSource<PaymentData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  paymentsData: PaymentData[] = [];
  pageSize = 10;
  currentPage = 1;
  


  constructor(private api:ApiService,private base_service:BaseServiceService) {
    this.getPaymentDetails(this.pageSize,this.currentPage)
    console.log(this.dataSource,"fsdgsg")
    
    this.dataSource = new MatTableDataSource(this.paymentsData);
  }

  getPaymentDetails(page_size:any,page:any,params?:any){
    let query = ""
    if(params){
      query = `?page_size=${page_size}&page=${page}&key=${params}`
    }else{
      query = `?page_size=${page_size}&page=${page}`
    }
   
    this.base_service.getData(`${environment.paymentDetails}${query}`).subscribe((res:any)=>{
      if(res.results){
        this.paymentsData = res.results
        this.dataSource = new MatTableDataSource(this.paymentsData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      }
     },(error:any)=>{
      this.api.showError(error.error.message)
     })
   
  }
  

  ngOnInit(): void {
    
  }
  applyFilter(event:any){
    if(event.target.value.length > 3){
      this.getPaymentDetails(this.pageSize,this.currentPage,event.target.value)
    }
   
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getPaymentDetails(this.pageSize,this.currentPage)
  }
   myTimer = setTimeout(() => {
    console.log('This will be logged after 2000 milliseconds');
  }, 2000);
 
  
}
