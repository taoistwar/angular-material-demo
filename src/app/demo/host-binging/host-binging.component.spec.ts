import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostBingingComponent } from './host-binging.component';

describe('HostBingingComponent', () => {
  let component: HostBingingComponent;
  let fixture: ComponentFixture<HostBingingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostBingingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostBingingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
