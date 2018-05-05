import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewReportsRoutingModule } from './viewActivity-routing.module';

import { ViewActivityComponent } from './viewActivity.component';

@NgModule({
  imports: [ThemeModule,ViewReportsRoutingModule],
  declarations: [ViewActivityComponent],
  providers: []
})
export class ViewActivityModule {}
