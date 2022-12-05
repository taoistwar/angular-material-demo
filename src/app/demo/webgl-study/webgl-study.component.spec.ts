import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglStudyComponent } from './webgl-study.component';

describe('WebglStudyComponent', () => {
  let component: WebglStudyComponent;
  let fixture: ComponentFixture<WebglStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglStudyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
