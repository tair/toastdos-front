import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcellularComponent } from './subcellular.component';

describe('SubcellularComponent', () => {
  let component: SubcellularComponent;
  let fixture: ComponentFixture<SubcellularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcellularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcellularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
