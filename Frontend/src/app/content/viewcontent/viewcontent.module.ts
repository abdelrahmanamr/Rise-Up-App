import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewContentRoutingModule } from './viewcontent-routing.module';

import { ViewContentComponent } from './viewcontent.component';

@NgModule({
  imports: [ThemeModule,ViewContentRoutingModule],
  declarations: [ViewContentComponent],
  providers: []
})
export class ViewContentModule {}
