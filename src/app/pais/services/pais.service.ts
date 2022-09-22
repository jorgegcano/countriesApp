import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/';
  private version: string = 'v3.1';

  public get httpParams() {
    return new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,flags,population'
    );
  }

  constructor(private http: HttpClient) {}

  public buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl + this.version}/name/${termino}`;

    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  public buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl + this.version}/capital/${termino}`;

    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  public getPaisPorAlpha(id: string): Observable<Country[]> {
    const url = `${this.apiUrl + this.version}/alpha/${id}`;
    return this.http.get<Country[]>(url);
  }

  public buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}v2/regionalbloc/${region}`;

    return this.http
      .get<Country[]>(url, { params: this.httpParams })
      .pipe(tap(console.log));
  }
}
