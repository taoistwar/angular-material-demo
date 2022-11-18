import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglDemoComponent } from './webgl-demo.component';

describe('WebglDemoComponent', () => {
  let component: WebglDemoComponent;
  let fixture: ComponentFixture<WebglDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
