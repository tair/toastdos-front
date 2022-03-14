import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordRecordComponent } from './keyword-record.component';

describe('KeywordRecordComponent', () => {
  let component: KeywordRecordComponent;
  let fixture: ComponentFixture<KeywordRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
