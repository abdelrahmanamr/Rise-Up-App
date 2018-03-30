import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';

@NgModule({
  imports: [ThemeModule, UsersRoutingModule],
  declarations: [UsersComponent],
  providers: []
})
export class UsersModule {}
