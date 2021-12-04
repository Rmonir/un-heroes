import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { Observable, Subscription } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { HeroesSearchService } from 'src/app/services/heroes-search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @ViewChild('searchResults') table: any;
  heroesList: Hero[] = [];
  expanded: any = {};
  timeout: any;
  filterInput!:string;

  ColumnMode = ColumnMode;

  constructor(private searchService: HeroesSearchService) {
   
  }
 
  ngOnInit(): void {
   
  }
  

  toggleExpandRow(row: Hero) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
