import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceWithControlComponent } from './evidence-with-control.component';

describe('EvidenceWithControlComponent', () => {
  let component: EvidenceWithControlComponent;
  let fixture: ComponentFixture<EvidenceWithControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceWithControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceWithControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
