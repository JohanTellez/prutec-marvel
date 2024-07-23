import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AuthService } from '../../services/auth/auth.service';
import { MarvelApiService } from '../../services/marvel-api/marvel-api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  loading = true;

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private marvelApiService: MarvelApiService
  ) {}

  async ngOnInit(): Promise<void> {
    const userId = await this.authService.userId$.toPromise();
    if (userId) {
      const favoriteComics = await this.favoritesService.getFavorites(userId);
      const comicIds = favoriteComics.map(fav => fav.comicId);
      if (comicIds.length > 0) {
        this.marvelApiService.getComicsByIds(comicIds).subscribe(
          response => {
            this.favorites = response.data.results;
            this.loading = false;
          },
          error => {
            console.error('Error al obtener los cómics favoritos:', error);
            this.loading = false;
          }
        );
      } else {
        this.loading = false;
      }
    }
  }
}
