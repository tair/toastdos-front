import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodDropdownComponent } from './method-dropdown.component';

describe('MethodDropdownComponent', () => {
  let component: MethodDropdownComponent;
  let fixture: ComponentFixture<MethodDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
