import { NgModule } from '@angular/core';
//import { ThemeModule } from '../@theme/theme.module';


import { CompanyRoutingModule } from './Company-routing.module';

import { CompanyComponent } from './Company.component';

@NgModule({
  //imports: [ThemeModule, CompanyRoutingModule],
  declarations: [CompanyComponent],
  entryComponents: [],
  providers: []
})
export class CompanyModule {}
