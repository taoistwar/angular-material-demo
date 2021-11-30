import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChildDemoComponent } from './child-demo/child-demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { IndexDemoComponent } from './index-demo/index-demo.component';
import { NgContentDemoComponent } from './ng-content-demo/ng-content-demo.component';
import { NgContentDemo2Component } from './ng-content-demo2/ng-content-demo2.component';
import { ViewChildDemoComponent } from './view-child-demo/view-child-demo.component';
import { NgContentIndexComponent } from './ng-content-index/ng-content-index.component';
import { HostBingingComponent } from './host-binging/host-binging.component';
import { HostListenerComponent } from './host-listener/host-listener.component';
import { DirectiveDemoComponent } from './directive-demo/directive-demo.component';
import { RainbowDirective } from './rainbow.directive';

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
  ],
  imports: [CommonModule, DemoRoutingModule],
})
export class DemoModule {}
