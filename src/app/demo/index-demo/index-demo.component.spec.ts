import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDemoComponent } from './index-demo.component';

describe('IndexDemoComponent', () => {
  let component: IndexDemoComponent;
  let fixture: ComponentFixture<IndexDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
