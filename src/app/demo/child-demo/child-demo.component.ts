import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-demo',
  templateUrl: './child-demo.component.html',
  styleUrls: ['./child-demo.component.less'],
})
export class ChildDemoComponent implements OnInit {
  name = 'child';
  constructor() {}

  ngOnInit(): void {
    console.log('app-child-demo初始化完成！');
  }

  setName(name: string): void {
    this.name = name;
  }
}
