import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSuggestedCompaniesComponent } from './viewSuggestedCompanies.component';

const routes: Routes = [
  { path: '', component: ViewSuggestedCompaniesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSuggestedCompaniesRoutingModule {}