import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationOverviewComponent } from './annotation-overview.component';

describe('AnnotationOverviewComponent', () => {
  let component: AnnotationOverviewComponent;
  let fixture: ComponentFixture<AnnotationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
