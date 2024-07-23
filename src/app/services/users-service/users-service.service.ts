import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ToastService } from '../shared/toast/toast.service';

interface User {
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
export class UsersServiceService {
  private dbPromise: Promise<IDBPDatabase<UserDB>>;

  constructor(private toastService: ToastService) {
    this.dbPromise = openDB<UserDB>('user-database', 1, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'email' });
      }
    });
  }

  async addUser(user: User): Promise<void> {
    const db = await this.dbPromise;
    const existingUser = await this.searchUser(user.email);
    if (!existingUser) {
      await db.add('users', user);
      this.toastService.showSuccess('Usuario agregado con éxito');
    } else {
      this.toastService.showError('El usuario ya existe');
    }
  }

  async searchUser(email: string): Promise<User | undefined> {
    const db = await this.dbPromise;
    return await db.get('users', email);
  }

  async getAllUsers(): Promise<User[]> {
    const db = await this.dbPromise;
    return await db.getAll('users');
  }

  async updateUser(updatedUser: User): Promise<void> {
    const db = await this.dbPromise;
    const existingUser = await this.searchUser(updatedUser.email);
    if (existingUser) {
      await db.put('users', updatedUser);
    } else {
      console.error('User not found');
    }
  }

  async deleteUser(email: string): Promise<void> {
    const db = await this.dbPromise;
    const existingUser = await this.searchUser(email);
    if (existingUser) {
      await db.delete('users', email);
    } else {
      console.error('User not found');
    }
  }
}
