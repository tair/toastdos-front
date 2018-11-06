import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologicalComponent } from './biological.component';

describe('BiologicalComponent', () => {
  let component: BiologicalComponent;
  let fixture: ComponentFixture<BiologicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiologicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiologicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
