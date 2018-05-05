import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewAllCompaniesRoutingModule } from './viewallcompanies-routing.module';

import { ViewAllCompaniesComponent } from './viewallcompanies.component';

@NgModule({
  imports: [ThemeModule, ViewAllCompaniesRoutingModule],
  declarations: [ViewAllCompaniesComponent],
  providers: []
})
export class ViewAllCompaniesModule { }