import { queryParameter, units } from './../../models/units.model';
import { Component, OnInit } from '@angular/core';
import { UnitsService } from 'src/app/services/units.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css'],
})
export class UnitDetailsComponent implements OnInit {
  
  isQueryParamExist: number = 1;

  unitDetail: units;

  constructor(private unitService: UnitsService) {}

  ngOnInit(): void {
    this.unitService
      .fetchData(this.isQueryParamExist)
      .subscribe((data: units) => {
        this.unitDetail = data;
      });
  }
}
