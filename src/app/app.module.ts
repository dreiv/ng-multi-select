import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoxComponent } from './box/box.component';
import { MultiSelectionCheckboxDirective } from './multi-selection-checkbox.directive';

@NgModule({
  declarations: [AppComponent, BoxComponent, MultiSelectionCheckboxDirective],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
