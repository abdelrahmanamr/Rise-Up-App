import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcontentComponent } from './editcontent.component';

const routes: Routes = [
  { path: '', component: EditcontentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditContentRoutingModule {}