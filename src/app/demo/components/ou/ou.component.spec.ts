import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuComponent } from './ou.component';

describe('OuComponent', () => {
  let component: OuComponent;
  let fixture: ComponentFixture<OuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OuComponent]
    });
    fixture = TestBed.createComponent(OuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
