import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsListComponent } from './pages/units-list/units-list.component';
import { UnitDetailsComponent } from './pages/units-list/unit-details/unit-details.component';

const appRoutes: Routes = [
  { path: 'units-list', component: UnitsListComponent },
  { path: 'units-detail', component: UnitDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
