import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewReportsRoutingModule } from './viewreports-routing.module';

import { ViewReportsComponent } from './viewreports.component';

@NgModule({
  imports: [ThemeModule, ViewReportsRoutingModule],
  declarations: [ViewReportsComponent],
  providers: []
})
export class ViewReportsModule { }
