import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddLeadEmitterService {

  private triggerGetSource = new Subject<void>();
  triggerGet$ = this.triggerGetSource.asObservable();
  private triggerGetFilter = new Subject<void>();
  triggerGetFilter$ = this.triggerGetFilter.asObservable();
  leadFilter = new BehaviorSubject('');
  leadFilterIcon = new BehaviorSubject('');
  followUpFilter=new BehaviorSubject('')
  followUpFilterIcon=new BehaviorSubject('')
  selectedFilter = new BehaviorSubject('');
  leadRefresh = new BehaviorSubject(false)
  customerFilter = new BehaviorSubject('');
  customerFilterIcon = new BehaviorSubject(false);
  selectedCustomerFilter = new BehaviorSubject('');
  private CustomertriggerGetSource = new Subject<void>();
  customerTriggerGet$ = this.CustomertriggerGetSource.asObservable();
  private customerTriggerGetFilter = new Subject<void>();
  customerTriggerGetFilter$ = this.customerTriggerGetFilter.asObservable();
 
  
 
  goBack = new BehaviorSubject(false)
  filterWithPageSize:any= new BehaviorSubject([]);
  triggerGet() {
    this.triggerGetSource.next();
  }
  triggerFilter():any {
    this.customerTriggerGetFilter.next();
  }






  customerFiltertriggerGet() {
    this.CustomertriggerGetSource.next();
  }
  customerfilterTriggerFilter():any {
    this.triggerGetFilter.next();
  }


}
