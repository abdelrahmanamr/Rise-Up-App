import { AppComponent } from './../../app.component';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContentRoutingModule } from './content-routing.module';

import { ContentComponent } from './content.component';
import { ContentService } from './content.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ThemeModule, ContentRoutingModule,FormsModule],
  declarations: [ContentComponent],
  providers: [ContentService]
})
export class ContentModule {}
