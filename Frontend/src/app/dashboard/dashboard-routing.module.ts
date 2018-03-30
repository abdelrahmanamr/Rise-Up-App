import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'items',
        loadChildren: './items/items.module#ItemsModule'
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadChildren:'./profile/profile.module#ProfileModule'

      },
      {
        path: 'users',
        loadChildren:'./users/users.module#UsersModule'

      },
      {
        path: 'addcompany',
        loadChildren:'./addcompany/addcompany.module#AddcompanyModule'

      }
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule {}
