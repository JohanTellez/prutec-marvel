import { Component, OnInit } from '@angular/core';
import { MarvelApiService } from '../../services/marvel-api/marvel-api.service';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
  comics: any[] = [];
  loading = true;
  favoritesMap: Map<number, boolean> = new Map();

  constructor(
    private marvelApiService: MarvelApiService,
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.marvelApiService.getComics().subscribe(
      async response => {
        this.comics = response.data.results;
        this.loading = false;
        await this.loadFavorites();
      },
      error => {
        console.error('Error al obtener los cómics:', error);
        this.loading = false;
      }
    );
  }

  async loadFavorites(): Promise<void> {
    const userId = await this.authService.userId$.toPromise();
    if (userId) {
      const favorites = await this.favoritesService.getFavorites(userId);
      const favoriteIds = new Set(favorites.map(fav => fav.comicId));
      this.comics.forEach(comic => {
        this.favoritesMap.set(comic.id, favoriteIds.has(comic.id));
      });
    }
  }

  async toggleFavorite(comicId: number): Promise<void> {
    const userId = await this.authService.userId$.toPromise();
    if (userId) {
      const isFavorite = this.favoritesMap.get(comicId) || false;
      if (isFavorite) {
        await this.favoritesService.removeFavorite(userId, comicId);
      } else {
        await this.favoritesService.addFavorite(userId, comicId);
      }
      this.favoritesMap.set(comicId, !isFavorite);
    }
  }

  isFavorite(comicId: number): boolean {
    return this.favoritesMap.get(comicId) || false;
  }
}
