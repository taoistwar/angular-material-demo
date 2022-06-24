import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildDemoComponent } from './child-demo/child-demo.component';

@Component({
  selector: 'app-view-child-demo',
  templateUrl: './view-child-demo.component.html',
  styleUrls: ['./view-child-demo.component.less'],
})
export class ViewChildDemoComponent implements OnInit {
  name = 'Tao';

  @ViewChild('child1')
  child1!: ChildDemoComponent;
  @ViewChild('child2')
  child2!: ChildDemoComponent;
  constructor() {}

  ngOnInit(): void {}
  clickChild1(): void {
    this.child1.setName('child1: ' + Math.random());
  }
  clickChild2(): void {
    this.child2.setName('child2: ' + Math.random());
  }
}
