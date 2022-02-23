import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Graph } from '@antv/x6';

@Component({
  selector: 'app-dag-demo',
  templateUrl: './dag-demo.component.html',
  styleUrls: ['./dag-demo.component.less'],
})
export class DagDemoComponent implements AfterViewInit {
  data = this.getData();
  @ViewChild('container')
  container!: ElementRef;
  graph: any;

  constructor() {}
  ngAfterViewInit(): void {
    const graph = new Graph({
      container: this.container.nativeElement,
      width: 800,
      height: 600,
    });
    graph.fromJSON(this.data);
  }

  getData(): any {
    return {
      // 节点
      nodes: [
        {
          id: 'node1', // String，可选，节点的唯一标识
          x: 40, // Number，必选，节点位置的 x 值
          y: 40, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: 'hello', // String，节点标签
        },
        {
          id: 'node2', // String，节点的唯一标识
          x: 160, // Number，必选，节点位置的 x 值
          y: 180, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: 'world', // String，节点标签
        },
      ],
      // 边
      edges: [
        {
          source: 'node1', // String，必须，起始节点 id
          target: 'node2', // String，必须，目标节点 id
        },
      ],
    };
  }
}
