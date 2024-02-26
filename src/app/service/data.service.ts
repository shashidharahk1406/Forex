import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private sharedData: any;

  setSharedData(data: any): void {
    this.sharedData = data;
  }

  getSharedData(): any {
    return this.sharedData;
  }
  dataUpdated = new EventEmitter<any>();

}
