import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelInputFormComponent } from './label-input-form.component';

describe('LabelInputFormComponent', () => {
  let component: LabelInputFormComponent;
  let fixture: ComponentFixture<LabelInputFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LabelInputFormComponent]
    });
    fixture = TestBed.createComponent(LabelInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
