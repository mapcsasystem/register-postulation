import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddYearPipe } from './addYear/add-year.pipe';



@NgModule({
  declarations: [
    AddYearPipe
  ],
  exports: [
    AddYearPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
