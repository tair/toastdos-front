import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnatomicalComponent } from './annatomical.component';

describe('AnnatomicalComponent', () => {
  let component: AnnatomicalComponent;
  let fixture: ComponentFixture<AnnatomicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnatomicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnatomicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
