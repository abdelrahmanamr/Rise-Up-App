import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { editExpertTagsRoutingModule } from './editExpertTags-routing.module';

import { editExpertTagsComponent } from './editExpertTags.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TagsInputModule} from 'ngx-tags-input/dist';
@NgModule({
  imports: [ThemeModule, editExpertTagsModule,FormsModule,ReactiveFormsModule,TagsInputModule.forRoot()],
  declarations: [editExpertTagsComponent],
  providers: []
})

export class editExpertTagsModule {}