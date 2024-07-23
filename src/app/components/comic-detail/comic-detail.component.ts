import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelApiService } from '../../services/marvel-api/marvel-api.service';
import { formatDate } from '@angular/common';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit {
  comic: any;
  loading = true;
  publicationDate: string | null = null;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private marvelApiService: MarvelApiService,
    private router: Router,
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const comicId = this.route.snapshot.paramMap.get('id');
    if (comicId) {
      this.marvelApiService.getComic(+comicId).subscribe(
        async response => {
          this.comic = response.data.results[0];
          const onsaleDate = this.comic?.dates.find((date: any) => date.type === 'onsaleDate')?.date;
          this.publicationDate = onsaleDate ? formatDate(onsaleDate, 'dd/MM/yyyy', 'en-US') : null;
          this.loading = false;
          this.isFavorite = await this.checkFavorite(+comicId);
        },
        error => {
          console.error('Error al obtener los detalles del cómic:', error);
          this.loading = false;
        }
      );
    }
  }

  async checkFavorite(comicId: number): Promise<boolean> {
    const userId = await this.authService.userId$.toPromise();
    if (userId) {
      const favorites = await this.favoritesService.getFavorites(userId);
      return favorites.some(fav => fav.comicId === comicId);
    }
    return false;
  }

  async toggleFavorite(): Promise<void> {
    const comicId = this.comic.id;
    const userId = await this.authService.userId$.toPromise();
    if (userId) {
      if (this.isFavorite) {
        await this.favoritesService.removeFavorite(userId, comicId);
      } else {
        await this.favoritesService.addFavorite(userId, comicId);
      }
      this.isFavorite = !this.isFavorite;
    }
  }

  goBack(): void {
    this.router.navigate(['/comics']);
  }
}
