import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  hideAfter(ms: number) {
    setTimeout(() => {
      this.subject.next(null);
    }, ms)
  }

  success(message: string, keepAfterNavigationChange = false, timeout = 0) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });

    if (timeout) {
      this.hideAfter(timeout);
    }
  }

  error(message: string, keepAfterNavigationChange = false, timeout = 0) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });

    if (timeout) {
      this.hideAfter(timeout);
    }
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
