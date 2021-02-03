import { NgModule } from '@angular/core';
import { AddYearPipe } from './addYear/add-year.pipe';
import { PhoneFormatPipe } from './phone/phone-format.pipe';

@NgModule({
  declarations: [
    AddYearPipe,
    PhoneFormatPipe,
  ],
  exports: [
    AddYearPipe,
    PhoneFormatPipe,
  ]
})
export class PipesModule { }
