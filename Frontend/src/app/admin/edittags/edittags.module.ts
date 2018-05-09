import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { EdittagsRoutingModule } from './edittags-routing.module';

import { EdittagsComponent } from './edittags.component';

@NgModule({
  imports: [ThemeModule, EdittagsRoutingModule],
  declarations: [EdittagsComponent],
  providers: []
})
export class EdittagsModule { }
