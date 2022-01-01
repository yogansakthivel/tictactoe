import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DisableCursorDirective } from './disable-cursor-directive.directive';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DisableCursorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
