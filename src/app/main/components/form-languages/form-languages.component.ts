import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguagesModel } from 'src/app/shared/models/languages.model';

@Component({
  selector: 'app-form-languages',
  templateUrl: './form-languages.component.html',
  styleUrls: ['./form-languages.component.scss']
})

export class FormLanguagesComponent implements OnInit {

  @Input() languagesData: LanguagesModel[] = [];

  @Output() newLanguages: EventEmitter<LanguagesModel[]> = new EventEmitter();
  @Output() validFormValueLanguages: EventEmitter<boolean> = new EventEmitter();

  titleButton = 'Agregar';

  formLanguagesData: FormGroup = this.fb.group({
    languages: ['', [Validators.required]],
    levelArchived: ['', [Validators.required]],
    timeExperiences: ['', [Validators.required, Validators.minLength(2)]]
  });

  indexValue: number;

  addLanguages(): void {
    if (this.formLanguagesData.invalid) {
      this.formLanguagesData.markAllAsTouched();
      this.validFormValueLanguages.emit(this.formLanguagesData.invalid);
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
    this.validFormValueLanguages.emit(false);
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.onChanges();
  }

  private updateEducation(index: number): void {
    this.languagesData[index] = this.formLanguagesData.value;
  }

  private onChanges(): void {
    this.formLanguagesData.valueChanges.subscribe(() => {
      this.validFormValueLanguages.emit(this.formLanguagesData.invalid);
    });
  }

  get languages(): AbstractControl {
    return this.formLanguagesData.get('languages');
  }
  get levelArchived(): AbstractControl {
    return this.formLanguagesData.get('levelArchived');
  }
  get timeExperiences(): AbstractControl {
    return this.formLanguagesData.get('timeExperiences');
  }

}
