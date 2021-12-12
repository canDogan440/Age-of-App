import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsListComponent } from './units-list/units-list.component';
import { UnitDetailsComponent } from './units-list/unit-details/unit-details.component';

const appRoutes: Routes = [
  { path: 'units-list', component: UnitsListComponent },
  { path: 'units-detail', component: UnitDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
