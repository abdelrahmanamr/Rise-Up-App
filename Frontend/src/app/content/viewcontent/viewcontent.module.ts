import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ViewContentRoutingModule } from './viewcontent-routing.module';
import { ViewContentComponent , SafePipe} from './viewcontent.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [ThemeModule,ViewContentRoutingModule,ClipboardModule],
  declarations: [ViewContentComponent,SafePipe ],
  providers: []
})
export class ViewContentModule {}
