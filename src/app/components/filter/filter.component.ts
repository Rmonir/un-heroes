import { ChangeDetectionStrategy, Component, Input,  OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
  @Input() control: any;
  @Input() form!: FormGroup;
  constructor(public filterService: FilterService) {
  }

  ngOnInit(): void {
    
  }
  
}
