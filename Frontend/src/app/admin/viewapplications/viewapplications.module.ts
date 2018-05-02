import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {ViewApplicationsRoutingModule } from './viewapplications-routing.module';

import { ViewApplicationsComponent } from './viewapplications.component';

@NgModule({
  imports: [ThemeModule,ViewApplicationsRoutingModule],
  declarations: [ViewApplicationsComponent],
  providers: []
})
export class ViewApplicationsModule {}
