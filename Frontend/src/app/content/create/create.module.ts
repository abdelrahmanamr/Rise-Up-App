import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateRoutingModule } from './create-routing.module';

import { CreateComponent } from './create.component';

@NgModule({
  imports: [ThemeModule, CreateRoutingModule,QuillModule,FormsModule,
    ReactiveFormsModule,CommonModule],
  declarations: [CreateComponent],
  providers: []
})
export class CreateModule {}
