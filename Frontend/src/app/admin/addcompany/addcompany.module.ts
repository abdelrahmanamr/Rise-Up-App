//Salma Osama
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AddcompanyRoutingModule } from './addcompany-routing.module';

import { AddcompanyComponent } from './addcompany.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TagsInputModule } from 'ngx-tags-input/dist';
@NgModule({
  imports: [ThemeModule, AddcompanyRoutingModule, FormsModule, ReactiveFormsModule, TagsInputModule.forRoot()],
  declarations: [AddcompanyComponent],
  providers: []
})

export class AddCompanyModule { }