import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-demo',
  templateUrl: './index-demo.component.html',
  styleUrls: ['./index-demo.component.less'],
})
export class IndexDemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onClick(type: string) {
    console.log('click', type);
  }
}
