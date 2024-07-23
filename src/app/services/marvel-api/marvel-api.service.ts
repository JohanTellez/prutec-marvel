import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  // https://gateway.marvel.com:443/v1/public/comics?apikey=5251c55b8282359fbe13e769814b638f

  private apiUrl = ' https://gateway.marvel.com:443/v1/public/comics';
  private apiKey = '5251c55b8282359fbe13e769814b638f';


  constructor(
    private http: HttpClient
  ) { }

  getComics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?apikey=${this.apiKey}`);
  }

  getComic(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}?apikey=${this.apiKey}`);
  }

  getComicsByIds(ids: number[]): Observable<any> {
    const idsString = ids.join(',');
    return this.http.get<any>(`${this.apiUrl}?ids=${idsString}&apikey=${this.apiKey}`);
  }



}
