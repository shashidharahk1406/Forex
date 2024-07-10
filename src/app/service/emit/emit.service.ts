import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitService {

  constructor() { }
  userRole = new BehaviorSubject('') 
  userName = new BehaviorSubject('') 
  private refresh= new Subject<any>;
  getRefresh= this.refresh.asObservable()
  
  private payment= new Subject<void>();
  getRefreshPayment= this.payment.asObservable()
  allocateSearch = new BehaviorSubject('')
  deleteAll = new BehaviorSubject(false);
  deleteAllCustomer = new BehaviorSubject(false);
  
  paymentLink(){
    return this.payment.next()
  }
  
  sendRefresh(data:any){
    return this.refresh.next(data)
  }
  private refreshByFilter= new Subject<any>;
  getRefreshByFilter= this.refreshByFilter.asObservable()
  sendRefreshbyFilter(data:any){
    return this.refreshByFilter.next(data)
  }
}
