import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './company.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: 'viewallcompanies',
        loadChildren: './viewallcompanies/viewallcompanies.module#ViewAllCompaniesModule'
      },
      {
        path: 'viewcompany',
        loadChildren: './viewcompany/viewcompany.module#ViewCompanyModule'
      },
      {
        path: '',
        redirectTo: 'viewallcompanies'
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CompanyRoutingModule {}
