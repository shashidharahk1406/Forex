import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PaymentData {
  paymentId: number;
  amount: number;
  email: string;
  contact: string;
  createdAt: string;
  status: string;
}

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  displayedColumns: string[] = ['paymentId', 'amount', 'email', 'contact', 'createdAt', 'status'];
  dataSource: MatTableDataSource<PaymentData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  paymentsData: PaymentData[] = [
    { 
      paymentId: 1, 
      amount: 50, 
      email: 'john@example.com', 
      contact: '1234567890', 
      createdAt: '2023-11-25', 
      status: 'Completed' 
    },
    { 
      paymentId: 2, 
      amount: 75, 
      email: 'sarah@example.com', 
      contact: '9876543210', 
      createdAt: '2023-11-22', 
      status: 'Pending' 
    },
    { 
      paymentId: 3, 
      amount: 120, 
      email: 'alice@example.com', 
      contact: '5555555555', 
      createdAt: '2023-11-20', 
      status: 'Failed' 
    },
    { 
      paymentId: 4, 
      amount: 50, 
      email: 'john@example.com', 
      contact: '1234567890', 
      createdAt: '2023-11-25', 
      status: 'Completed' 
    },
    { 
      paymentId: 5, 
      amount: 75, 
      email: 'sarah@example.com', 
      contact: '9876543210', 
      createdAt: '2023-11-22', 
      status: 'Pending' 
    },
    { 
      paymentId: 6, 
      amount: 120, 
      email: 'alice@example.com', 
      contact: '5555555555', 
      createdAt: '2023-11-20', 
      status: 'Failed' 
    },
    // Add more data as needed
  ];


  constructor() {
    this.dataSource = new MatTableDataSource(this.paymentsData);
  }


  

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event:any){}
  search(){}
}
