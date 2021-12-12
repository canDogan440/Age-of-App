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
  queryParameter: queryParameter;
  unitDetail: units;

  constructor(
    private route: ActivatedRoute,
    private unitService: UnitsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((data: queryParameter) => {
      this.queryParameter = data;
      console.log(this.queryParameter);
    });

    this.unitService.fetchData().subscribe((data: units) => {
      this.unitDetail = data;
      console.log(this.unitDetail);
    });
  }
}
