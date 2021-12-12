import { UnitsService } from 'src/app/services/units.service';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { UnitsEntity } from '../models/units.model';

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.css'],
})
export class UnitsListComponent implements OnInit, AfterViewInit {
  ages = ['Dark', 'Feudal', 'Castle', 'Imperial'];
  costs = ['Food', 'Wood', 'Gold'];

  unitData: [UnitsEntity];

  isSelected: boolean = false;

  testData = [];

  @ViewChild('foodRange', { static: false }) rangeOfFood: ElementRef;
  @ViewChild('woodRange', { static: false }) rangeOfWood: ElementRef;
  @ViewChild('goldRange', { static: false }) rangeOfGold: ElementRef;

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.unitsService.fetchData().subscribe((data: any) => {
      this.unitData = data.units;
      this.testData = data.units;
    });
  }

  changeAge(ages: string) {
    this.isSelected = !this.isSelected;

    if (this.isSelected === true) {
      let filteredAge = this.testData.filter((item) => {
        return item.age == ages;
      });
      console.log('filtered', filteredAge);

      this.testData = filteredAge;
    } else {
      this.testData = this.unitData;
    }
  }

  ngAfterViewInit(): void {
    const changeOfFood = fromEvent(this.rangeOfFood.nativeElement, 'change');
    const changeOfWood = fromEvent(this.rangeOfWood.nativeElement, 'change');
    const changeOfGold = fromEvent(this.rangeOfGold.nativeElement, 'change');

    changeOfFood.subscribe((data: any) => {
      this.foodValue = data.currentTarget.value;
    });

    changeOfWood.subscribe((data: any) => {
      this.woodValue = data.currentTarget.value;
    });

    changeOfGold.subscribe((data: any) => {
      this.goldValue = data.currentTarget.value;
    });
  }

  resetFilter() {
    this.foodValue = 0;
    this.woodValue = 0;
    this.goldValue = 0;

    this.testData = this.unitData;
  }

  isGold: boolean = false;
  isWood: boolean = false;
  isFood: boolean = false;

  checkBox(cost: string) {
    if (cost === 'Wood') {
      this.isWood = !this.isWood;
    } else if (cost === 'Gold') {
      console.log('çalışıyor');
      this.isGold = !this.isGold;
    } else if (cost === 'Food') {
      this.isFood = !this.isFood;
    }
  }

  foodValue: number = 0;
  woodValue: number = 0;
  goldValue: number = 0;

  onChange(event) {
    console.log('event', event);

    this.foodValue =
      event.target.id == 'foodrange' ? event.target.value : this.foodValue;

    this.woodValue =
      event.target.id == 'woodrange' ? event.target.value : this.woodValue;

    this.goldValue =
      event.target.id == 'goldrange' ? event.target.value : this.goldValue;

    if (this.isSelected === true) {
      const filtered = this.testData.filter((item) => {
        if (
          item?.cost?.Wood == undefined &&
          item?.cost?.Food == undefined &&
          item?.cost?.Gold == undefined
        ) {
          return false;
        } else if (this.goldValue && this.woodValue && this.foodValue === 200) {
          return false;
        } else if (
          (item?.cost?.Wood == undefined ||
            item?.cost?.Wood == null ||
            item?.cost?.Wood >= this.woodValue) &&
          (item?.cost?.Food == undefined ||
            item?.cost?.Food == null ||
            item?.cost?.Food >= this.foodValue) &&
          (item?.cost?.Gold == undefined ||
            item?.cost?.Gold == null ||
            item?.cost?.Gold >= this.goldValue)
        ) {
          return true;
        } else {
          return false;
        }
      });

      console.log('filtrelenmiş', filtered);

      this.testData = [];

      this.testData = filtered;

      console.log('test data ', this.testData);
    } else {
      const filtered = this.unitData.filter((item) => {
        if (
          item?.cost?.Wood == undefined &&
          item?.cost?.Food == undefined &&
          item?.cost?.Gold == undefined
        ) {
          return false;
        } else if (this.goldValue && this.woodValue && this.foodValue === 200) {
          return false;
        } else if (
          (item?.cost?.Wood == undefined ||
            item?.cost?.Wood == null ||
            item?.cost?.Wood >= this.woodValue) &&
          (item?.cost?.Food == undefined ||
            item?.cost?.Food == null ||
            item?.cost?.Food >= this.foodValue) &&
          (item?.cost?.Gold == undefined ||
            item?.cost?.Gold == null ||
            item?.cost?.Gold >= this.goldValue)
        ) {
          return true;
        } else {
          return false;
        }
      });

      console.log('filtrelenmiş', filtered);

      this.testData = [];

      this.testData = filtered;

      console.log('test data ', this.testData);
    }
  }
}
