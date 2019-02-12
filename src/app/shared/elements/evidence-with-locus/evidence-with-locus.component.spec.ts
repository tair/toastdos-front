import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceWithLocusComponent } from './evidence-with-locus.component';

describe('EvidenceWithLocusComponent', () => {
  let component: EvidenceWithLocusComponent;
  let fixture: ComponentFixture<EvidenceWithLocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceWithLocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceWithLocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
