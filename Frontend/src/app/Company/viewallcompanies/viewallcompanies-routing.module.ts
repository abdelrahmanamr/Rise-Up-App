import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllCompaniesComponent } from './viewallcompanies.component';

const routes: Routes = [
  { path: '', component: ViewAllCompaniesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllCompaniesRoutingModule {}
