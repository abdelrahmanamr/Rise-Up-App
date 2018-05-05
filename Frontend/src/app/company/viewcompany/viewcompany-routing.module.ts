import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCompanyComponent } from './viewcompany.component';

const routes: Routes = [
  { path: '', component: ViewCompanyComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCompanyRoutingModule { }