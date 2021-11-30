import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-binging',
  templateUrl: './host-binging.component.html',
  styleUrls: ['./host-binging.component.less'],
})
export class HostBingingComponent implements OnInit {
  @HostBinding('style.color') color?: string;
  constructor() {}

  ngOnInit(): void {
    this.color = 'red';
  }
}
