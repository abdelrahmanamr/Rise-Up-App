import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewAllExpertsRoutingModule } from './viewallexperts-routing.module';

import { ViewAllExpertsComponent } from './viewallexperts.component';

@NgModule({
  imports: [ThemeModule,ViewAllExpertsRoutingModule],
  declarations: [ViewAllExpertsComponent],
  providers: []
})
export class ViewAllExpertsModule {}