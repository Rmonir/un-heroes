import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DynamicFiltersComponent } from 'src/app/components/dynamic-filters/dynamic-filters.component';
import { SearchResultComponent } from 'src/app/components/search-result/search-result.component';
import { SearchQueryString } from 'src/app/data/query-strings.config';
import { Hero } from 'src/app/models/hero.model';
import { CommonService } from 'src/app/services/common.service';
import { HeroesSearchService } from 'src/app/services/heroes-search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {

  heroesListSub: Subscription | undefined;
  queryParamsSub: Subscription | undefined;

  searchFlag: boolean = false;
  @ViewChild("dynamicFiltersForm", { static: true }) dynamicFiltersForm!: DynamicFiltersComponent;
  @ViewChild("searchResults", { static: true }) searchResults!: SearchResultComponent;


  constructor(private router: Router,
    private searchService: HeroesSearchService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let queryParams!: Params;
    if (this.searchFlag === false) {
      this.queryParamsSub = this.activatedRoute.queryParams.subscribe(params => {
        if (Object.keys(params).length > 0) {
          queryParams = params;
          // get params
          let searchObj = this.commonService.getSearchObj(queryParams);
          if (Object.keys(searchObj).length > 0) {
            // search 
            this.search(searchObj)

            // set values in the form 
            this.dynamicFiltersForm.setFormGroup(searchObj)
          }
        } else {
          // bind all data
          this.bindAllData();
          // reset filter form controls 
          this.dynamicFiltersForm.getFormGroup()
        }
      })
    }
  }

  onSearch(queryParams: any) {
    this.searchFlag = true;
    let searchObj: Hero = new Hero();
    if (Object.keys(queryParams).length > 0) {
      // prepare search obj from filter form contols
      searchObj = this.commonService.getSearchObj(queryParams);
      // search 
      this.search(searchObj)
    } else {
      // bind all data
      this.bindAllData();
    }

    // update page url by params
    this.router.navigate(
      ["/search"],
      {
        relativeTo: this.activatedRoute,
        queryParams: Object.keys(queryParams).length > 0 ? queryParams as Params : null,
        queryParamsHandling: null
      });
  }

  onReset() {
    // bind all data
    this.bindAllData();

    // clear query params
    this.router.navigate(
      ["/search"],
      {
        relativeTo: this.activatedRoute,
        queryParams: null
      });
  }

  bindAllData() {
    this.heroesListSub = this.searchService.allHeroesData.subscribe(heroes => {
      this.searchResults.heroesList = heroes as Hero[];
      this.searchResults.heroesFilterSourc=heroes as Hero[];

    })
  }
  search(searchObj: Hero) {
    this.heroesListSub = this.searchService.searchForHeroes(searchObj).subscribe(result => {
      this.searchResults.heroesList = result;
      this.searchResults.heroesFilterSourc=result;
    })
  }

  ngOnDestroy(): void {
    //unsubscribe
    if (this.heroesListSub) {
      this.heroesListSub.unsubscribe();
    }

    if(this.queryParamsSub){
      this.queryParamsSub.unsubscribe();
    }
  }
}
