import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllCompanysComponent } from './viewallcompanys.component';

const routes: Routes = [
  { path: '', component: ViewAllCompanysComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllcompanysRoutingModule {}
