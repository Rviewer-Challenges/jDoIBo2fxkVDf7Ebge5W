import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from './dropdown/dropdown.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';

@NgModule({
  declarations: [
    ToggleThemeComponent,
    SearchInputComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleThemeComponent,
    SearchInputComponent,
    DropdownComponent
  ]
})
export class SharedModule { }
