import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfileRoutingModule } from './profile-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TagsInputModule } from 'ngx-tags-input/dist';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ThemeModule, ProfileRoutingModule,TagsInputModule.forRoot(),FormsModule],
  declarations: [ProfileComponent],
  providers: []
})
export class ProfileModule {}
