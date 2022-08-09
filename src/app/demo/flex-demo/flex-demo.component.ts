import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-demo',
  templateUrl: './flex-demo.component.html',
  styleUrls: ['./flex-demo.component.less'],
})
export class FlexDemoComponent implements OnInit {
  show = true;
  constructor() {}

  ngOnInit(): void {}
  toggle(): void {
    this.show = !this.show;
  }
}
