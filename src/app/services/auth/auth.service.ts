import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ToastService } from '../shared/toast/toast.service';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UserDB extends DBSchema {
  users: {
    key: string;
    value: User;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPromise: Promise<IDBPDatabase<UserDB>>;
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(this.getCurrentUser()?.email || null);
  userId$ = this.userIdSubject.asObservable();

  constructor(private toastService: ToastService) {
    this.dbPromise = openDB<UserDB>('user-database', 1, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'email' });
      }
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    const db = await this.dbPromise;
    const user = await db.get('users', email);
    if (user && user.password === password) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.loggedInSubject.next(true);
      this.userIdSubject.next(user.id);
      return true;
    } else {
      this.toastService.showError('Credenciales incorrectas, valide nuevamente.');
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.loggedInSubject.next(false);
    this.userIdSubject.next(null);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('loggedInUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  private getCurrentUserId(): string | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }
}
