import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-listener',
  templateUrl: './host-listener.component.html',
  styleUrls: ['./host-listener.component.less'],
})
export class HostListenerComponent implements OnInit {
  color = 'black';
  constructor() {}

  ngOnInit(): void {}

  @HostListener('click')
  onKeydown(): void {
    this.color = 'red';
  }

  @HostListener('dblclick')
  onKeyup(): void {
    this.color = 'black';
  }
}
