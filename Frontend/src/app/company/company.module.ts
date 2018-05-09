import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';

@NgModule({
  imports: [ThemeModule, CompanyRoutingModule],
  declarations: [CompanyComponent],
  entryComponents: [],
  providers: []
})
export class CompanyModule { }
