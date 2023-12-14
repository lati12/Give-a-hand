import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTypeComponent } from './education-type.component';

describe('EducationTypeComponent', () => {
  let component: EducationTypeComponent;
  let fixture: ComponentFixture<EducationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationTypeComponent]
    });
    fixture = TestBed.createComponent(EducationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
