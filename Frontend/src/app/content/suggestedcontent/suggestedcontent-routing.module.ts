import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuggestedContentComponent } from './suggestedcontent.component';

const routes: Routes = [
  { path: '', component: SuggestedContentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestedContentRoutingModule { }
