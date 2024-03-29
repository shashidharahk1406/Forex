import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, timer } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdleDetectionService {
  private userActivity$: Observable<any>;

  constructor() {
    const activityEvents = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
      'scroll'
    ];

    this.userActivity$ = merge(
      ...activityEvents.map(event => fromEvent(document, event))
    ).pipe(
      mapTo(true),
      startWith(true)
    );
  }

  get userActivity(): Observable<any> {
    return this.userActivity$;
  }
}
