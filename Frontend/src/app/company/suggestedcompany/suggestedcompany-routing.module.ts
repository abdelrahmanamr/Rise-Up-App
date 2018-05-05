import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestedcompanyComponent } from './suggestedcompany.component';

const routes: Routes = [
  { path: '', component: SuggestedcompanyComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestedcompanyRoutingModule {}