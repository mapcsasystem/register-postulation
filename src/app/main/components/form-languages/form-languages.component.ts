import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguagesInterface } from 'src/app/shared/interfaces/languages.interface';

@Component({
  selector: 'app-form-languages',
  templateUrl: './form-languages.component.html',
  styleUrls: ['./form-languages.component.scss']
})
export class FormLanguagesComponent implements OnInit {

  @Input() languagesData: LanguagesInterface[] = [];

  @Output() newLanguages: EventEmitter<LanguagesInterface[]> = new EventEmitter();
  @Output() validFormValueLanguages: EventEmitter<boolean> = new EventEmitter();

  titleButton = 'Agregar';

  formLanguagesData: FormGroup = this.fb.group({
    languages: ['', Validators.required],
    levelArchived: ['', Validators.required],
    timeExperiences: [null, Validators.required]
  });

  indexValue: number;

  addLanguages(): void {
    if (this.formLanguagesData.invalid) {
      return;
    }

    switch (this.titleButton) {
      case 'Agregar':
        this.languagesData.push(this.formLanguagesData.value);
        break;
      case 'Editar':
        this.updateEducation(this.indexValue);
        break;
    }
    this.titleButton = 'Agregar';
    this.newLanguages.emit(this.languagesData);
    this.formLanguagesData.reset();
  }

  deleteLanguages(index: number): void {
    this.languagesData.splice(index, 1);
    this.newLanguages.emit(this.languagesData);
  }

  setValuesControl(index: number): void {
    this.titleButton = 'Editar';
    this.indexValue = index;
    this.formLanguagesData.setValue(this.languagesData[index]);
  }

  private updateEducation(index: number): void {
    this.languagesData[index] = this.formLanguagesData.value;
  }

  private onChanges(): void {
    this.formLanguagesData.valueChanges.subscribe(() => {
      this.validFormValueLanguages.emit(this.formLanguagesData.invalid);
    });
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.onChanges();
  }

}
