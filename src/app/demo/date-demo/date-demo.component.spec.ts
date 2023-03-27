import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDemoComponent } from './date-demo.component';

describe('DateDemoComponent', () => {
  let component: DateDemoComponent;
  let fixture: ComponentFixture<DateDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
