import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { DagDemoComponent } from './dag-demo/dag-demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { DirectiveDemoComponent } from './directive-demo/directive-demo.component';
import { RainbowDirective } from './directive-demo/rainbow.directive';
import { NgModelFormDemoComponent } from './form/ng-model-form-demo/ng-model-form-demo.component';
import { ReactiveFormDemoComponent } from './form/reactive-form-demo/reactive-form-demo.component';
import { HostBingingComponent } from './host-binging/host-binging.component';
import { HostListenerComponent } from './host-listener/host-listener.component';
import { IndexDemoComponent } from './index-demo/index-demo.component';
import { NgContentDemoComponent } from './ng-content-index/ng-content-demo/ng-content-demo.component';
import { NgContentDemo2Component } from './ng-content-index/ng-content-demo2/ng-content-demo2.component';
import { NgContentIndexComponent } from './ng-content-index/ng-content-index.component';
import { ChildDemoComponent } from './view-child-demo/child-demo/child-demo.component';
import { ViewChildDemoComponent } from './view-child-demo/view-child-demo.component';
import { CanvasDemoComponent } from './canvas-demo/canvas-demo.component';
import { WebglDemoComponent } from './webgl-demo/webgl-demo.component';
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
    ReactiveFormDemoComponent,
    NgModelFormDemoComponent,
    CanvasDemoComponent,
    WebglDemoComponent,
  ],
  imports: [
    CommonModule,
    NzDropDownModule,
    DemoRoutingModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzDividerModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzDropDownModule,
  ],
})
export class DemoModule {}
