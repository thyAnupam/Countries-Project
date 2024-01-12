import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Country } from './Model/CountryModel';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://restcountries.com/v3.1/currency/';

  getCountriesByCurrency(currencyCode: string): Observable<Country[]> {
    return this.http.get<any[]>(`${this.apiUrl}${currencyCode}`)
      .pipe(
        map(response => {
          return response.map(country => {
            return {
              name: country.name.official,
              flags: {
                svg: country.flags.svg,
              },
              capital: country.capital[0],
              population: country.population,
              region: country.region,
            };
          });
        })
      );
}
}
