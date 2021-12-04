import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, toArray } from 'rxjs/operators'
import { countries } from '../data/countries-list';
import { SearchFilters } from '../data/filters-settings.config';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() {
  }

  // bind countries 
  getSelectOptions(url: string): Observable<any[]> {
    if (url && url.length > 0) {
      // return api service getter
      return of(countries);
    } else {
      return new Observable<any[]>()
    }
  }

  // bind search filters 
  getSearchFilters(): Observable<any[]>{
    return of(SearchFilters)
  }
}
