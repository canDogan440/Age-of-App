import { ActivatedRoute } from '@angular/router';
import { queryParameter, units } from './../models/units.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as dataOfJson from '../units.json';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  converterForJsonData = dataOfJson;
  unitList: units = this.converterForJsonData.units;
  unitListForFilter: units = this.converterForJsonData.units;
  dataTypeOfFilter: any;
  isAgesButtonsClicked: boolean = false;
  queryParameter: number;
  costsArray = [
    {
      cost: 'Food',
      costValue: 0,
      openButtonForCost: false,
    },
    {
      cost: 'Wood',
      costValue: 0,
      openButtonForCost: false,
    },
    {
      cost: 'Gold',
      costValue: 0,
      openButtonForCost: false,
    },
  ];

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
          this.unitListForFilter.filter((item) => {
            return item.id == this.queryParameter;
          })
        );
      } else {
        observer.next(this.unitListForFilter);
      }
    });

    return unitData;
  }

  agesButtonFilter(age) {
    this.isAgesButtonsClicked = !this.isAgesButtonsClicked;
    if (this.isAgesButtonsClicked === true) {
      let filterdForAge = this.unitListForFilter.filter((item) => {
        return item.age == age;
      });
      this.unitListForFilter = filterdForAge;
    } else {
      this.unitListForFilter = this.unitList;
    }
  }

  checkBox(cost: string) {
    this.costsArray.forEach((element) => {
      if (element.cost == cost) {
        element.openButtonForCost = !element.openButtonForCost;
      }
    });
  }

  changeOfCostServiceDetecter(changeForFood, changeForWood, changeForGold) {
    changeForFood.subscribe((data: any) => {
      this.costsArray[0].costValue = data.currentTarget.value;
      console.log('hadi', data.data.currentTarget.value);
    });
    changeForWood.subscribe((data: any) => {
      this.costsArray[1].costValue = data.currentTarget.value;
    });
    changeForGold.subscribe((data: any) => {
      this.costsArray[2].costValue = data.currentTarget.value;
    });
  }

  resetFilter() {
    this.costsArray.forEach((element) => {
      element.costValue = 0;
    });
    this.isAgesButtonsClicked = false;

    this.unitListForFilter = this.unitList;
  }

  filterForAges(ages: string) {
    this.isAgesButtonsClicked = !this.isAgesButtonsClicked;

    if (this.isAgesButtonsClicked === true) {
      let filteredAge = this.unitListForFilter.filter((item) => {
        return item.age == ages;
      });

      this.unitListForFilter = filteredAge;
    } else {
      this.unitListForFilter = this.unitList;
    }
  }
  onRangeInputChange(event) {
    this.costsArray.forEach((element) => {
      if (event.target.id == element.cost) {
        console.log('sen kimsin', (element.costValue = event.target.value));
        element.costValue = event.target.value;
      }
    });
    console.log('çalışıyorum');
    this.unitDataRangeFilter();
  }
  unitDataRangeFilter() {
    if (this.isAgesButtonsClicked === true) {
      this.dataTypeOfFilter = this.unitListForFilter;
    } else {
      this.dataTypeOfFilter = this.unitList;
    }
    if (
      (this.costsArray[0].openButtonForCost &&
        this.costsArray[1].openButtonForCost) ||
      (this.costsArray[1].openButtonForCost &&
        this.costsArray[2].openButtonForCost) ||
      (this.costsArray[0].openButtonForCost &&
        this.costsArray[2].openButtonForCost)
    ) {
      const filtered = this.dataTypeOfFilter.filter((item) => {
        if (
          this.costsArray[0].costValue &&
          this.costsArray[1].costValue &&
          this.costsArray[2].costValue > 0
        ) {
          return false;
        }
        if (
          this.costsArray[0].openButtonForCost &&
          this.costsArray[1].openButtonForCost &&
          item?.cost?.Food <= this.costsArray[0].costValue &&
          item?.cost?.Wood <= this.costsArray[1].costValue
        ) {
          console.log('bu mu çalışıyor');
          return true;
        }
        if (
          this.costsArray[1].openButtonForCost &&
          this.costsArray[2].openButtonForCost &&
          item?.cost?.Wood <= this.costsArray[1].costValue &&
          item?.cost?.Gold <= this.costsArray[2].costValue
        ) {
          console.log('peki burada mı');
          return true;
        }
        if (
          this.costsArray[0].openButtonForCost &&
          this.costsArray[2].openButtonForCost &&
          item?.cost?.Food <= this.costsArray[0].costValue &&
          item?.cost?.Gold <= this.costsArray[2].costValue
        ) {
          return true;
        } else {
          return false;
        }
      });

      this.unitListForFilter = [];

      this.unitListForFilter = filtered;
    } else {
      const filtered = this.dataTypeOfFilter.filter((item) => {
        if (item?.cost?.Food <= this.costsArray[0].costValue) {
          return true;
        }
        if (item?.cost?.Wood <= this.costsArray[1].costValue) {
          return true;
        }
        if (item?.cost?.Gold <= this.costsArray[2].costValue) {
          return true;
        } else {
          return false;
        }
      });
      this.unitListForFilter = [];

      this.unitListForFilter = filtered;
    }
  }
}
