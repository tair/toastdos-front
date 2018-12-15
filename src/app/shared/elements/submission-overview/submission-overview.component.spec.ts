import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionOverviewComponent } from './submission-overview.component';

describe('SubmissionOverviewComponent', () => {
  let component: SubmissionOverviewComponent;
  let fixture: ComponentFixture<SubmissionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
