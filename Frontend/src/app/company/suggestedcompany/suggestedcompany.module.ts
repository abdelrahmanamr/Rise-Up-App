import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SuggestedcompanyRoutingModule } from './suggestedcompany-routing.module';

import { SuggestedcompanyComponent } from './suggestedcompany.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TagsInputModule} from 'ngx-tags-input/dist';
@NgModule({
  imports: [ThemeModule, SuggestedcompanyRoutingModule,FormsModule,ReactiveFormsModule,TagsInputModule.forRoot()],
  declarations: [SuggestedcompanyComponent],
  providers: []
})

export class SuggestedCompanyModule {}