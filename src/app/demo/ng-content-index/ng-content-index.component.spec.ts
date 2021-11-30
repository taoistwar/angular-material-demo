import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContentIndexComponent } from './ng-content-index.component';

describe('NgContentIndexComponent', () => {
  let component: NgContentIndexComponent;
  let fixture: ComponentFixture<NgContentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgContentIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgContentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
