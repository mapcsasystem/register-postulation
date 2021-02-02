import { NgModule } from '@angular/core';
import { AddYearPipe } from './addYear/add-year.pipe';

@NgModule({
  declarations: [
    AddYearPipe
  ],
  exports: [
    AddYearPipe
  ]
})
export class PipesModule { }
