import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitService {

  constructor() { }
  private refresh= new Subject<any>;
  getRefresh= this.refresh.asObservable()
  sendRefresh(data:any){
    return this.refresh.next(data)
  }
}
