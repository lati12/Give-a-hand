import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEducationComponent } from './teacher-education.component';

describe('TeacherEducationComponent', () => {
  let component: TeacherEducationComponent;
  let fixture: ComponentFixture<TeacherEducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherEducationComponent]
    });
    fixture = TestBed.createComponent(TeacherEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
