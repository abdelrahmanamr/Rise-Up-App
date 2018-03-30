import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewExpertRoutingModule } from './viewexpert-routing.module';

import { ViewExpertComponent } from './viewexpert.component';

@NgModule({
  imports: [ThemeModule, ViewExpertRoutingModule],
  declarations: [ViewExpertComponent],
  providers: []
})
export class ViewExpertModule {}