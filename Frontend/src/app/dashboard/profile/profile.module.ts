import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ThemeModule, ProfileRoutingModule],
  declarations: [ProfileComponent],
  providers: []
})
export class ProfileModule {}
