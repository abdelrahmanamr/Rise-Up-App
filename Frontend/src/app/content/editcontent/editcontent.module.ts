import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { EditContentRoutingModule } from './editcontent-routing.module';

import { EditcontentComponent } from './editcontent.component';

@NgModule({
  imports: [ThemeModule,EditContentRoutingModule],
  declarations: [EditcontentComponent],
  providers: []
})

export class EditcontentModule { }
