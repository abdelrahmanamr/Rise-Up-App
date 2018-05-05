import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeModule } from '../../@theme/theme.module';
import { EditRoutingModule } from './edit-routing.module';
import { TagsInputModule } from 'ngx-tags-input/dist';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [ThemeModule, EditRoutingModule, QuillModule, FormsModule,
    ReactiveFormsModule, CommonModule, TagsInputModule.forRoot()],
  declarations: [EditComponent],
  providers: []
})
export class EditModule { }
