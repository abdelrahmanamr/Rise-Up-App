import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewSuggestedCompaniesRoutingModule } from './viewSuggestedCompanies-routing.module';

import { ViewSuggestedCompaniesComponent } from './viewSuggestedCompanies.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TagsInputModule } from 'ngx-tags-input/dist';
@NgModule({
  imports: [ThemeModule, ViewSuggestedCompaniesRoutingModule, FormsModule, ReactiveFormsModule, TagsInputModule.forRoot()],
  declarations: [ViewSuggestedCompaniesComponent],
  providers: []
})

export class ViewSuggestedCompaniesModule {


}