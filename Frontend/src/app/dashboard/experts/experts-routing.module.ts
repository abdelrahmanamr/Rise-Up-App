import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpertsComponent } from './experts.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertsComponent,
    children: [
      {
        path: 'expert',
        loadChildren: './expert/expert.module#ExpertModule'
      },
      { 
    path: '',
    redirectTo: '',
      pathMatch: 'full'
     }
]
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertsRoutingModule {}
