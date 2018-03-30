import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewAllContentsRoutingModule } from './viewallcontents-routing.module';

import { ViewAllContentsComponent } from './viewallcontents.component';

@NgModule({
  imports: [ThemeModule,ViewAllContentsRoutingModule],
  declarations: [ViewAllContentsComponent],
  providers: []
})
export class ViewAllContentsModule {}
