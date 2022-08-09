import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModelFormDemoComponent } from './ng-model-form-demo.component';

describe('NgModelFormDemoComponent', () => {
  let component: NgModelFormDemoComponent;
  let fixture: ComponentFixture<NgModelFormDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgModelFormDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgModelFormDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
