import { UnitsEntity ,units} from './../models/units.model';
import { UnitsService } from 'src/app/services/units.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.css'],
})
export class UnitsListComponent implements OnInit {
  ages = ['Dark', 'Feudal', 'Castle', 'Imperial'];
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
  mainUnitsData: units;
  secondaryUnitsData: units| any;
  constructor(public unitsService: UnitsService) {}
  ngOnInit(): void {
    this.unitsService.fetchData().subscribe((data: any) => {
      this.mainUnitsData = data;
      this.secondaryUnitsData = this.mainUnitsData;
    });
  }
  refreshDataFromService() {
    this.unitsService.fetchData().subscribe((data) => {
      this.secondaryUnitsData = data;
    });
  }
  onAgesButtonClick(age) {
    this.unitsService.agesButtonFilter(age);
    this.refreshDataFromService();
  }
  onRangeFilterChange(event) {
    this.unitsService.onRangeInputChange(event);
    this.refreshDataFromService();
  }
  showAllDataButton() {
    this.unitsService.resetFilter();
    this.refreshDataFromService();
  }
}
