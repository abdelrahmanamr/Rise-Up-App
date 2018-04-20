import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { EditRoutingModule } from './edit-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TagsInputModule } from 'ngx-tags-input/dist';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [ThemeModule, EditRoutingModule,TagsInputModule.forRoot(),FormsModule],
  declarations: [EditComponent],
  providers: []
})
export class EditModule {}
