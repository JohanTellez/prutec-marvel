import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messageSource = new BehaviorSubject<ToastMessage | null>(null);
  message$ = this.messageSource.asObservable();

  showSuccess(message: string) {
    this.messageSource.next({ message, type: 'success' });
    setTimeout(() => this.messageSource.next(null), 3000);
  }

  showError(message: string) {
    this.messageSource.next({ message, type: 'error' });
    setTimeout(() => this.messageSource.next(null), 3000);
  }
}
