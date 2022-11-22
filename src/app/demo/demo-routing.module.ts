import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DagDemoComponent } from './dag-demo/dag-demo.component';
import { DirectiveDemoComponent } from './directive-demo/directive-demo.component';
import { FlexDemoComponent } from './flex-demo/flex-demo.component';
import { FormlyDemoComponent } from './formly-demo/formly-demo.component';
import { HostBingingComponent } from './host-binging/host-binging.component';
import { HostListenerComponent } from './host-listener/host-listener.component';
import { IndexDemoComponent } from './index-demo/index-demo.component';
import { NgContentIndexComponent } from './ng-content-index/ng-content-index.component';
import { ViewChildDemoComponent } from './view-child-demo/view-child-demo.component';
import { WebglStudyComponent } from './webgl-study/webgl-study.component';

const routes: Routes = [
  {
    path: '',
    component: IndexDemoComponent,
  },
  {
    path: 'ViewChild',
    component: ViewChildDemoComponent,
  },
  {
    path: 'ng-content',
    component: NgContentIndexComponent,
  },
  {
    path: 'HostBinging',
    component: HostBingingComponent,
  },
  {
    path: 'HostListener',
    component: HostListenerComponent,
  },
  {
    path: 'directive',
    component: DirectiveDemoComponent,
  },
  {
    path: 'flex',
    component: FlexDemoComponent,
  },
  {
    path: 'dag',
    component: DagDemoComponent,
  },
  {
    path: 'formly',
    component: FormlyDemoComponent,
  },
  {
    path: 'webgl-study',
    component: WebglStudyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
