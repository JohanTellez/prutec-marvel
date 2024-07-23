import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface Favorite {
  userId: string;
  comicId: number;
}

interface FavoritesDB extends DBSchema {
  favorites: {
    key: number;
    value: Favorite;
    indexes: { 'by-user': string };
  };
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private dbPromise: Promise<IDBPDatabase<FavoritesDB>>;

  constructor() {
    this.dbPromise = openDB<FavoritesDB>('favorites-database', 1, {
      upgrade(db) {
        db.createObjectStore('favorites', { keyPath: 'comicId' }).createIndex('by-user', 'userId');
      }
    });
  }

  async addFavorite(userId: string, comicId: number): Promise<void> {
    const db = await this.dbPromise;
    await db.put('favorites', { userId, comicId });
  }

  async removeFavorite(userId: string, comicId: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('favorites', comicId);
  }

  async getFavorites(userId: string): Promise<Favorite[]> {
    const db = await this.dbPromise;
    return db.getAllFromIndex('favorites', 'by-user', userId);
  }
}
