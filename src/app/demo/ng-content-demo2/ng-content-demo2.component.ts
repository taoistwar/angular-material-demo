import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-ng-content-demo2',
  templateUrl: './ng-content-demo2.component.html',
  styleUrls: ['./ng-content-demo2.component.less'],
})
export class NgContentDemo2Component implements OnInit {
  @ContentChild(TemplateRef) template!: TemplateRef<any>;

  show = true;
  constructor() {}

  ngOnInit(): void {}
}
