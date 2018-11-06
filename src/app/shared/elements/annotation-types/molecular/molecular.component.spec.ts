import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MolecularComponent } from './molecular.component';

describe('MolecularComponent', () => {
  let component: MolecularComponent;
  let fixture: ComponentFixture<MolecularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MolecularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MolecularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
