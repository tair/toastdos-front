import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinInteractionComponent } from './protein-interaction.component';

describe('ProteinInteractionComponent', () => {
  let component: ProteinInteractionComponent;
  let fixture: ComponentFixture<ProteinInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteinInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
