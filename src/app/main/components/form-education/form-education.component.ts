import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationInterface } from 'src/app/shared/interfaces/education.interface';

@Component({
  selector: 'app-form-education',
  templateUrl: './form-education.component.html',
  styleUrls: ['./form-education.component.scss']
})
export class FormEducationComponent implements OnInit {

  @Input() educationData: EducationInterface[] = [];

  @Output() newEducation: EventEmitter<EducationInterface[]> = new EventEmitter();
  @Output() validFormValueEducation: EventEmitter<boolean> = new EventEmitter();

  // educationData: EducationInterface[] = [];
  titleButton = 'Agregar';

  formEducationData: FormGroup = this.fb.group({
    placeEducation: ['', Validators.required],
    levelArchived: ['', Validators.required],
    timeEducation: [null, Validators.required]
  });

  indexValue: number;

  addEducation(): void {
    if (this.formEducationData.invalid) {
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

  private updateEducation(index: number): void {
    this.educationData[index] = this.formEducationData.value;
  }

  private onChanges(): void {
    this.formEducationData.valueChanges.subscribe(() => {
      this.validFormValueEducation.emit(this.formEducationData.invalid);
    });
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.onChanges();
  }

}
