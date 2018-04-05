import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewContentRoutingModule } from './viewcontent-routing.module';

import { ViewContentComponent  } from './viewcontent.component';
import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  imports: [ThemeModule,ViewContentRoutingModule,ClipboardModule ],
  declarations: [ViewContentComponent ],
  providers: []
})
export class ViewContentModule {}
