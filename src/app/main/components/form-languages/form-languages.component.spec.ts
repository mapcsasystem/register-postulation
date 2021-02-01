import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLanguagesComponent } from './form-languages.component';

describe('FormLanguagesComponent', () => {
  let component: FormLanguagesComponent;
  let fixture: ComponentFixture<FormLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
