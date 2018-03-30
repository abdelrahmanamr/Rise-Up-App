import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewExpertComponent } from './viewexpert.component';

const routes: Routes = [
  { path: '', component: ViewExpertComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExpertRoutingModule {}