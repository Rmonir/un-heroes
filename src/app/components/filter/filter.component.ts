import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ControlType } from 'src/app/enums/control-type.enum';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Input() control: any;
  @Input() form!: FormGroup;
  listOptions: any;
  sub: Subscription | undefined;
  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
    if (this.control.type === ControlType.Dropdown) {
      this.sub =this.filterService.getSelectOptions(this.control.api).subscribe(opts => {
        this.listOptions = opts;
      })
    }
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
