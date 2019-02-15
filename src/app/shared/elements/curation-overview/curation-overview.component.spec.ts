import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurationOverviewComponent } from './curation-overview.component';

describe('CurationOverviewComponent', () => {
  let component: CurationOverviewComponent;
  let fixture: ComponentFixture<CurationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
