import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { units } from '../models/units.model';
import * as data from './../units.json'

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  unitList:  units = data;

  constructor() { }

  fetchData() {
    const unitLists = new Observable((observer: any) => {
      observer.next(this.unitList);
    });

    return unitLists;
  }
}
