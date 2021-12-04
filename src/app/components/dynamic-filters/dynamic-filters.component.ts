import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { FilterService } from 'src/app/services/filter.service';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-dynamic-filters',
  templateUrl: './dynamic-filters.component.html',
  styleUrls: ['./dynamic-filters.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class DynamicFiltersComponent implements OnInit {

  searchhFilters$!: Observable<any[]>;
  form!: FormGroup;
  @Output() onFilterEvent: EventEmitter<Params> = new EventEmitter<Params>();
  @Output() onResetEvent: EventEmitter<void> = new EventEmitter<void>();
  collapsed = false;

  constructor(private filterService: FilterService,
    private commonService: CommonService) {
    this.searchhFilters$ = this.filterService.getSearchFilters();
    this.form = new FormGroup(this.getFormGroup());
  }

  ngOnInit(): void {
  }

  onFilter() {
    let queryString = this.commonService.getQueryParams(this.form);
    this.onFilterEvent.emit(queryString);
  }

  getFormGroup() {
    let group: any = {};
    this.searchhFilters$.subscribe(filters => {
      filters.forEach(filter => {
        group[filter.title] = new FormControl('');
      });
    })
    return group;
  }

  setFormGroup(searchObj: any) {
    let group: any = {};
    this.searchhFilters$.subscribe(filters => {
      filters.forEach(filter => {
        if (searchObj[filter.title] && searchObj[filter.title].length > 0) {
          group[filter.title] = new FormControl(searchObj[filter.title]);
        } else {
          group[filter.title] = new FormControl('');
        }
      });
    })
    this.form = new FormGroup(group);
  }

  reset() {
    this.form.reset();
    this.onResetEvent.emit();
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
  expand() {
    this.collapsed = false;
  }
  collapse() {
    this.collapsed = true;
  }
}
