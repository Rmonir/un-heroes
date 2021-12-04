import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Hero } from '../models/hero.model';
import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroesSearchService implements OnDestroy {
  private _jsonURL = './assets/data/heros-list.json';
  private herosSub: Subscription | undefined;
  private herosSearchSub: Subscription | undefined;
  allHeroesData: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  constructor(private http: HttpClient) {
    // get all heroes data 
    this.herosSub = this.getJSON().subscribe((data) => {
      if (data && data.length > 0) {
        this.allHeroesData.next(data as Hero[])
      } else
        this.allHeroesData.next([]);
    })

  }

  // filter heroes data 
  searchForHeroes(heroObj: Hero): Observable<Hero[]> {
    return this.getJSON().pipe(
      map(data => {
        let filterdHeroesList = data as Hero[];
        if (heroObj.Name && heroObj.Name.length > 0) {
          filterdHeroesList = filterdHeroesList.filter(c => c.Name?.toLowerCase().includes(heroObj.Name.trim().toLowerCase()))
        }
        if (heroObj.Country && heroObj.Country.length > 0) {
          filterdHeroesList = filterdHeroesList.filter(c => c.CountryAlpha3Code == heroObj.Country)
        }
        if (heroObj.Email && heroObj.Email.length > 0) {
          filterdHeroesList = filterdHeroesList.filter(c => c.Email?.toLowerCase().includes(heroObj.Email.trim().toLowerCase()))
        }
        if (heroObj.Phone && heroObj.Phone.length > 0) {
          filterdHeroesList = filterdHeroesList.filter(c => c.Phone?.toLowerCase().includes(heroObj.Phone.toLowerCase()))
        }
        if (heroObj.Date && heroObj.Date.length > 0) {
          debugger;
          filterdHeroesList = filterdHeroesList.filter(c => new Date(c.Date).getDate() == new Date(heroObj.Date).getDate())
        }
        if (heroObj.Company && heroObj.Company.length > 0) {
          filterdHeroesList = filterdHeroesList.filter(c => c.Company?.toLowerCase().includes(heroObj.Company.trim().toLowerCase()))
        }
        return filterdHeroesList;
      }))
  }

  // get data from json file 
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnDestroy(): void {
    if (this.herosSub) {
      this.herosSub.unsubscribe();
    }
    if (this.herosSearchSub) {
      this.herosSearchSub.unsubscribe();
    }
  }
}
