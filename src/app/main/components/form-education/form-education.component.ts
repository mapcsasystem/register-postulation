import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationModel } from 'src/app/shared/models/education.model';

@Component({
  selector: 'app-form-education',
  templateUrl: './form-education.component.html',
  styleUrls: ['./form-education.component.scss']
})

export class FormEducationComponent implements OnInit {

  @Input() educationData: EducationModel[] = [];

  @Output() newEducation: EventEmitter<EducationModel[]> = new EventEmitter();
  @Output() validFormValueEducation: EventEmitter<boolean> = new EventEmitter();

  titleButton = 'Agregar';

  formEducationData: FormGroup = this.fb.group({
    placeEducation: ['', [Validators.required]],
    levelArchived: ['', [Validators.required]],
    timeEducation: ['', [Validators.required, Validators.minLength(2)]]
  });

  indexValue: number;

  addEducation(): void {
    if (this.formEducationData.invalid) {
      this.formEducationData.markAllAsTouched();
      this.validFormValueEducation.emit(this.formEducationData.invalid);
      return;
    }

    switch (this.titleButton) {
      case 'Agregar':
        this.educationData.push(this.formEducationData.value);
        break;
      case 'Editar':
        this.updateEducation(this.indexValue);
        break;
    }
    this.titleButton = 'Agregar';
    this.newEducation.emit(this.educationData);
    this.formEducationData.reset();
    this.validFormValueEducation.emit(false);
  }

  deleteEducation(index: number): void {
    this.educationData.splice(index, 1);
    this.newEducation.emit(this.educationData);
  }

  setValuesControl(index: number): void {
    this.titleButton = 'Editar';
    this.indexValue = index;
    this.formEducationData.setValue(this.educationData[index]);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.onChangesData();
  }

  private updateEducation(index: number): void {
    this.educationData[index] = this.formEducationData.value;
  }

  private onChangesData(): void {
    this.formEducationData.valueChanges.subscribe(() => {
      this.validFormValueEducation.emit(this.formEducationData.invalid);
    });
  }

  get placeEducation(): AbstractControl {
    return this.formEducationData.get('placeEducation');
  }
  get levelArchived(): AbstractControl {
    return this.formEducationData.get('levelArchived');
  }
  get timeEducation(): AbstractControl {
    return this.formEducationData.get('timeEducation');
  }
}
