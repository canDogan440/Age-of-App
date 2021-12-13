import { ActivatedRoute } from '@angular/router';
import { queryParameter, units } from './../models/units.model';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import * as dataOfJson from '../units.json';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {

  converterForJsonData = dataOfJson;

  unitList: units = this.converterForJsonData.units;

  queryParameter: number;

  constructor(private route: ActivatedRoute) {}

  getQuerryParameter() {
    this.route.queryParams.subscribe((data: queryParameter) => {
      this.queryParameter = Number(data.id);
    });
  }

  fetchData(paramter?: number) {
    const unitData = new Observable((observer: any) => {
      if (paramter) {
        this.getQuerryParameter();

        observer.next(
          this.unitList.filter((item) => {
            return item.id == this.queryParameter;
          })
        );
      } else {
        observer.next(this.unitList);
      }
    });

    return unitData;
  }
}
