import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/shared/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: string | null = null;
  type: 'success' | 'error' | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.message$.subscribe(toast => {
      if (toast) {
        this.message = toast.message;
        this.type = toast.type;
      } else {
        this.message = null;
        this.type = null;
      }
    });
  }

  clearMessage() {
    this.message = null;
    this.type = null;
  }
}
