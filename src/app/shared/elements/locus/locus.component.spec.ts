import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocusComponent } from './locus.component';

describe('LocusComponent', () => {
  let component: LocusComponent;
  let fixture: ComponentFixture<LocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
