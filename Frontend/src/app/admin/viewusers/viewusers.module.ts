import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewUsersRoutingModule } from './viewusers-routing.module';

import { ViewUsersComponent } from './viewusers.component';

@NgModule({
  imports: [ThemeModule, ViewUsersRoutingModule],
  declarations: [ViewUsersComponent],
  providers: []
})
export class ViewUsersModule { }
