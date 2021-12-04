import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { SearchQueryString } from '../data/query-strings.config';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  // get parameters from filter form controls 
  getQueryParams(form: FormGroup): Params {
    let queryParams: Params = {};
    if (form) {
      Object.keys(form.controls).forEach(key => {
        let value = form.get(key)!.value;
        // value !== -1 this to ignore default select in dropdown
        if (value && value.length > 0 && value != '-1') {
          // get the queryparams object from form controls  and map it using SearchQueryString config 
          queryParams[Object.getOwnPropertyDescriptor(SearchQueryString, key)?.value] = value
        }
      });
    }
    return queryParams;
  }

  // get the search model from queryparams
  getSearchObj(queryParams: any): Hero {
    let searchObj: Hero = new Hero();
    let dummyObj: any = {};
    Object.keys(queryParams).forEach(key => {
      let value = queryParams[key];
      // value !== -1 this to ignore default select in dropdown
      if (value && value.length > 0 && value != '-1') {
        // get the search model from queryparams and map it using SearchQueryString config 
        Object.keys(SearchQueryString).forEach(prop => {
          if (Object.getOwnPropertyDescriptor(SearchQueryString, prop)?.value == key) {
            dummyObj[prop] = value;
          }
        })
      }
    });
    Object.assign(searchObj, dummyObj);
    return searchObj

  }

}
