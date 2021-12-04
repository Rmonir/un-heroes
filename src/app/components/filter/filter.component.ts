import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlType } from 'src/app/enums/control-type.enum';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() control!: any;
  @Input() form!: FormGroup;
  constructor(public filterService: FilterService) {

  }

  
  ngOnInit(): void {
   
  }

}
