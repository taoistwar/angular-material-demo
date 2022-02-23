import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContentDemo2Component } from './ng-content-demo2.component';

describe('NgContentDemo2Component', () => {
  let component: NgContentDemo2Component;
  let fixture: ComponentFixture<NgContentDemo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgContentDemo2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgContentDemo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
