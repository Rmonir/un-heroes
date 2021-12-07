import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { combineLatest, Observable, of } from 'rxjs';
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
  heroesFilterSourc: Hero[] = [];
  expanded: any = {};
  timeout: any;
  //filterInput!:string;
  a$: Observable<any> | undefined
  ColumnMode = ColumnMode;

  form!: FormGroup;

  constructor(private searchService: HeroesSearchService) {
    this.form = new FormGroup(
      { "filterInput": new FormControl('') }
    )

  }

  ngOnInit(): void {
    
    let sub = this.form.get("filterInput")?.valueChanges.subscribe(text => {
      const combined = combineLatest([of(this.heroesFilterSourc), of(text)]);
      combined.subscribe(value => {
        this.heroesList = value[0].filter(c => c.Name?.toLowerCase().includes(text.trim().toLowerCase()) || c.Company?.toLowerCase().includes(value[1].trim().toLowerCase()))
      });
    })
  }


  toggleExpandRow(row: Hero) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
