import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddLeadEmitterService {

  private triggerGetSource = new Subject<void>();
  triggerGet$ = this.triggerGetSource.asObservable();

  triggerGet() {
    this.triggerGetSource.next();
  }
}
