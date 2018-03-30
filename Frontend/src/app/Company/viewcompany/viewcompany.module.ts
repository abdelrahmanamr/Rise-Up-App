import { NgModule } from '@angular/core';
//import { ThemeModule } from '../@theme/theme.module';


import { ViewCompanyRoutingModule} from './viewcompany-routing.module';

import { ViewCompanyComponent } from './viewcompany.component';

@NgModule({
  //imports: [ThemeModule, CompanyRoutingModule],
  declarations: [ViewCompanyComponent],
  entryComponents: [],
  providers: []
})
export class CompanyModule {}
