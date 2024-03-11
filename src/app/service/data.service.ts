import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();
  constructor() { }
  private sharedData: any;


  url:any = "https://fcmdev.thestorywallcafe.com/api/follow-up/?page=1&page_size=5";
  setFilteredFollowUpURL(url:string){
    this.url = url
  }

  getFollowupfilterURL(){
    return this.url
  }


  setSharedData(...args : any[]): void {
    this.sharedData = args;
  }

  getSharedData(): any {
    return this.sharedData;
  }
  dataUpdated = new EventEmitter<any>();


  sendData(data: any) {
    this.dataSubject.next(data);
  }
  resetData(): void {
    this.dataSubject.next(null);
  }

renderingFilterData:any=[]
  setFormDataFollowupFilter(data:any){
this.renderingFilterData=data
  }

  getFormDataFollowupFilter(){
    return this.renderingFilterData
      }


  
}
