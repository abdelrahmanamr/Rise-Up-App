import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ExpertsRoutingModule } from './experts-routing.module';

import { ExpertsComponent } from './experts.component';

@NgModule({
  imports: [ThemeModule, ExpertsRoutingModule],
  declarations: [ExpertsComponent],
  providers: []
})
export class ExpertsModule {}