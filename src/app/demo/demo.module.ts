import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DemoRoutingModule } from './demo-routing.module';
import { DirectiveDemoComponent } from './directive-demo/directive-demo.component';
import { RainbowDirective } from './directive-demo/rainbow.directive';
import { HostBingingComponent } from './host-binging/host-binging.component';
import { HostListenerComponent } from './host-listener/host-listener.component';
import { IndexDemoComponent } from './index-demo/index-demo.component';
import { NgContentDemoComponent } from './ng-content-index/ng-content-demo/ng-content-demo.component';
import { NgContentDemo2Component } from './ng-content-index/ng-content-demo2/ng-content-demo2.component';
import { NgContentIndexComponent } from './ng-content-index/ng-content-index.component';
import { ChildDemoComponent } from './view-child-demo/child-demo/child-demo.component';
import { ViewChildDemoComponent } from './view-child-demo/view-child-demo.component';
import { DagDemoComponent } from './dag-demo/dag-demo.component';

@NgModule({
  declarations: [
    ViewChildDemoComponent,
    NgContentDemoComponent,
    IndexDemoComponent,
    NgContentDemo2Component,
    ChildDemoComponent,
    NgContentIndexComponent,
    HostBingingComponent,
    HostListenerComponent,
    DirectiveDemoComponent,
    RainbowDirective,
    DagDemoComponent,
  ],
  imports: [CommonModule, DemoRoutingModule],
})
export class DemoModule {}
