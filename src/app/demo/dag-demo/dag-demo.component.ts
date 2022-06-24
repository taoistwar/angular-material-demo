import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Addon, Graph, Shape } from '@antv/x6';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import {
  CubeNode,
  EtlNode,
  FilterNode,
  InputNode,
  OutputNode,
  SimpleNodeView,
  TransformNode,
} from './nodes';
const { Rect, Circle } = Shape;
@Component({
  selector: 'app-dag-demo',
  templateUrl: './dag-demo.component.html',
  styleUrls: ['./dag-demo.component.less'],
})
export class DagDemoComponent implements AfterViewInit {
  @ViewChild('stencilContainer')
  stencilContainer!: ElementRef;
  @ViewChild('contentContainer')
  contentContainer!: ElementRef;
  @ViewChild('minimapContainer')
  minimapContainer!: ElementRef;
  @ViewChild('dropdownMenu')
  dropdownMenu!: NzDropdownMenuComponent;
  graph: Graph | undefined;
  currentNode: any;

  constructor(private nzContextMenuService: NzContextMenuService) {}
  ngAfterViewInit(): void {
    this.graph = new Graph({
      container: this.contentContainer.nativeElement,
      grid: true,
      autoResize: true,
      panning: {
        enabled: true,
      },
      interacting: true,
      mousewheel: {
        enabled: true,
        minScale: 0.5,
        maxScale: 3,
        global: true,
      },
      snapline: {
        tolerance: 10,
        enabled: true,
      },
      selecting: {
        enabled: true,
        rubberband: true,
        strict: true,
        movable: true,
        multiple: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        modifiers: ['ctrl', 'alt'],
      },
      minimap: {
        enabled: true,
        container: this.minimapContainer.nativeElement,
        width: 198,
        height: this.minimapContainer.nativeElement.offsetHeight - 2,
        padding: 10,
        scalable: false,
        graphOptions: {
          async: true,
          getCellView(cell) {
            if (cell.isNode()) {
              return SimpleNodeView;
            }
            return undefined;
          },
          createCellView(cell) {
            if (cell.isEdge()) {
              return null;
            }
            return undefined;
          },
        },
      },
      scroller: {
        enabled: true,
        pannable: false,
        pageVisible: false,
        pageBreak: false,
        autoResize: true,
      },
      keyboard: {
        enabled: true,
      },
      history: {
        enabled: true,
      },
      connecting: {
        snap: {
          radius: 20,
        },
        allowBlank: false,
        allowMulti: false,
        allowLoop: false,
        allowEdge: false,
        allowNode: false,
        highlight: false,
      },
    });
    this.graph.on('node:contextmenu', (param) => {
      const { e, x, y, node, view } = param;
      console.log('e', e);
      console.log('x', x);
      console.log('y', y);
      console.log('node', node, JSON.stringify(node));
      console.log('view', view);
      this.currentNode = node;
      if (e.originalEvent) {
        const event = {
          x: e.originalEvent.clientX,
          y: e.originalEvent.clientY,
        };
        this.nzContextMenuService.create(event, this.dropdownMenu);
      }
    });

    this.graph.on('node:click', (param) => {
      console.log('node:dblclick', param);
      const { e, x, y, node, view } = param;
    });
    this.graph.bindKey(['ctrl+c', 'alt+c'], () => {
      if (this.graph) {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.copy(cells, {
            useLocalStorage: true,
          });
        }
      }
      return false;
    });
    console.log(
      'this.minimapContainer.nativeElement',
      this.minimapContainer.nativeElement.offsetHeight
    );

    this.graph.bindKey(['ctrl+v', 'alt+v'], () => {
      if (this.graph) {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 });
          this.graph.cleanSelection();
          this.graph.select(cells);
        }
      }
      return false;
    });

    this.graph.bindKey(['ctrl+z', 'alt+z'], () => {
      this.graph?.undo();
      return false;
    });
    this.graph.bindKey(
      ['ctrl+y', 'ctrl+shift+z', 'alt+y', 'alt+shift+z'],
      () => {
        this.graph?.redo();
        return false;
      }
    );
    this.graph.bindKey('del', () => {
      if (this.graph) {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.removeCells(cells);
        }
      }
      return false;
    });
    // this.graph.centerContent();

    const stencil = new Addon.Stencil({
      title: '数据开发',
      target: this.graph,
      search: (cell: any, keyword: any) => {
        return cell.shape?.indexOf(keyword) !== -1;
      },
      placeholder: 'Search components...',
      notFoundText: 'Not Found',
      collapsable: true,
      stencilGraphWidth: 220,
      groups: [
        {
          name: 'store',
          title: '数据存储',
          collapsable: true,
          graphHeight: 120,
          graphOptions: {
            grid: 1,
          },
        },
        {
          name: 'transform',
          title: '数据处理',
          collapsable: true,
          graphHeight: 500,
        },
      ],
      layoutOptions: {
        columns: 1,
        columnWidth: 160,
        rowHeight: 50,
      },
    });
    this.stencilContainer.nativeElement.appendChild(stencil.container);
    const inputNode = new InputNode({ title: '输入', shape: 'input' });
    const outputNode = new OutputNode({});

    const etlNode = new EtlNode();

    const filterNode = new FilterNode();

    const cubeNode = new CubeNode();

    const transformNode = new TransformNode();

    stencil.load([inputNode, outputNode], 'store');
    stencil.load(
      [filterNode.clone(), cubeNode, etlNode, transformNode],
      'transform'
    );
  }
  deleteNode(): void {
    if (this.currentNode && this.graph) {
      this.graph?.removeCell(this.currentNode);
    }
  }
  configNode(): void {
    if (this.currentNode) {
      this.currentNode.data = {
        tableId: 1,
      };
    }
  }
  previewNode(): void {}
  zoomReset(): void {
    this.graph?.zoomTo(1);
  }
  save(): void {
    const data = this.graph?.toJSON();
    console.log('data', data);
    console.log('data', JSON.stringify(data));
  }
}
