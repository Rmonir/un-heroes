import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { combineLatest, of, Subscription } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { HeroesSearchService } from 'src/app/services/heroes-search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  @ViewChild('searchResults') table: any;
  heroesList: Hero[] = [];
  heroesFilterSourc: Hero[] = [];
  expanded: any = {};
  timeout: any;
  //filterInput!:string;
  sub: Subscription | undefined
  ColumnMode = ColumnMode;

  form!: FormGroup;

  constructor(private searchService: HeroesSearchService) {
    this.form = new FormGroup(
      { "filterInput": new FormControl('') }
    )

  }

  ngOnInit(): void {
    this.sub = this.form.get("filterInput")?.valueChanges.subscribe(text => {
      this.heroesList = this.heroesFilterSourc.filter(c => c.Name?.toLowerCase().includes(text.trim().toLowerCase()) 
                                                      || c.Company?.toLowerCase().includes(text.trim().toLowerCase()))
      // const combined = combineLatest([of(this.heroesFilterSourc), of(text)]);
      // combined.subscribe(([heros,filter]) => {
      //   this.heroesList = heros.filter(c => c.Name?.toLowerCase().includes(filter.trim().toLowerCase()) || c.Company?.toLowerCase().includes(filter.trim().toLowerCase()))
      // });
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  toggleExpandRow(row: Hero) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
