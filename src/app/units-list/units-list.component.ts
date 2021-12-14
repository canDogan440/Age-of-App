import { UnitsEntity, units } from './../models/units.model';
import { UnitsService } from 'src/app/services/units.service';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.css'],
})
export class UnitsListComponent implements OnInit, AfterViewInit {
  
  ages = ['Dark', 'Feudal', 'Castle', 'Imperial'];
  costs = ['Food', 'Wood', 'Gold'];

  mainUnitsData: units;
  isAgesButtonsClicked: boolean = false;
  secondaryUnitsData: [UnitsEntity] | any;

  dataTypeOfFilter: any[] | units;

  @ViewChild('foodRange', { static: false }) rangeOfFood: ElementRef;
  @ViewChild('woodRange', { static: false }) rangeOfWood: ElementRef;
  @ViewChild('goldRange', { static: false }) rangeOfGold: ElementRef;

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.unitsService.fetchData().subscribe((data: units) => {
      this.mainUnitsData = data;
      this.secondaryUnitsData = data;
    });
  }

  filterForAges(ages: string) {
    this.isAgesButtonsClicked = !this.isAgesButtonsClicked;

    if (this.isAgesButtonsClicked === true) {
      let filteredAge = this.secondaryUnitsData.filter((item) => {
        return item.age == ages;
      });
      console.log('filtered', filteredAge);

      this.secondaryUnitsData = filteredAge;
    } else {
      this.secondaryUnitsData = this.mainUnitsData;
    }
  }
  foodRangeValue: number = 0;
  woodRangeValue: number = 0;
  goldRangeValue: number = 0;

  ngAfterViewInit(): void {
    const changeOfFood = fromEvent(this.rangeOfFood.nativeElement, 'change');
    const changeOfWood = fromEvent(this.rangeOfWood.nativeElement, 'change');
    const changeOfGold = fromEvent(this.rangeOfGold.nativeElement, 'change');

    changeOfFood.subscribe((data: any) => {
      this.foodRangeValue = data.currentTarget.value;
    });

    changeOfWood.subscribe((data: any) => {
      this.woodRangeValue = data.currentTarget.value;
    });

    changeOfGold.subscribe((data: any) => {
      this.goldRangeValue = data.currentTarget.value;
    });
  }

  resetFilter() {
    this.foodRangeValue = 0;
    this.woodRangeValue = 0;
    this.goldRangeValue = 0;

    this.isAgesButtonsClicked = false

    this.secondaryUnitsData = this.mainUnitsData;
  }

  isGold: boolean = false;
  isWood: boolean = false;
  isFood: boolean = false;

  checkBox(cost: string) {
    if (cost === 'Wood') {
      this.isWood = !this.isWood;
    } else if (cost === 'Gold') {
      this.isGold = !this.isGold;
    } else if (cost === 'Food') {
      this.isFood = !this.isFood;
    }
  }

  onRangeInputChange(event) {
    this.foodRangeValue =
      event.target.id == 'foodrange' ? event.target.value : this.foodRangeValue;

    this.woodRangeValue =
      event.target.id == 'woodrange' ? event.target.value : this.woodRangeValue;

    this.goldRangeValue =
      event.target.id == 'goldrange' ? event.target.value : this.goldRangeValue;

    this.unitDataRangeFilter();
  }

  unitDataRangeFilter() {

    if (this.isAgesButtonsClicked === true) {
      this.dataTypeOfFilter = this.secondaryUnitsData;
    } else {
      this.dataTypeOfFilter = this.mainUnitsData;
    }

    const filtered = this.dataTypeOfFilter.filter((item) => {
      if (
        this.woodRangeValue &&
        this.foodRangeValue &&
        this.goldRangeValue === 200
      ) {
        return true;
      } else if (
        (item?.cost?.Wood == undefined ||
          item?.cost?.Wood == null ||
          item?.cost?.Wood <= this.woodRangeValue) &&
        (item?.cost?.Food == undefined ||
          item?.cost?.Food == null ||
          item?.cost?.Food <= this.foodRangeValue) &&
        (item?.cost?.Gold == undefined ||
          item?.cost?.Gold == null ||
          item?.cost?.Gold <= this.goldRangeValue)
      ) {
        return true;
      } else {
        return false;
      }
    });
    console.log('filtrelenmiş', filtered);

    this.secondaryUnitsData = [];

    this.secondaryUnitsData = filtered;

    console.log('test data ', this.secondaryUnitsData);
  }
}
