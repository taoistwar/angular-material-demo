import { Graph, NodeView, Shape } from '@antv/x6';
import { HTML } from '@antv/x6/lib/shape/standard';
const { Rect, Circle } = Shape;

export type DagNodeStatus = undefined | 'success' | 'failed';
export interface DagUtilsOption {
  status?: DagNodeStatus;
  title?: string;
  shape: string;
}
export const DagUtils = {
  genHtml(option: DagUtilsOption): string {
    let status = option.status || '';
    if (status) {
      status = ' ' + status;
    }
    const data = `
      <div class="dag-node${status}">
        <img src="/assets/flow/${option.shape}.svg">
        <span class="label">${option.title}</span>
      </div>`;
    return data;
  },
};

function defaultHtml(title: string, shape: string): string {
  return DagUtils.genHtml({ title, shape });
}

interface DagProperties extends HTML.Properties {
  title: string;
}
class DagNode extends Shape.HTML<DagProperties> {}
DagNode.config({
  width: 180,
  height: 36,
});

export const InputNode = DagNode.define({
  html: defaultHtml('Input', 'input'),
  ports: {
    groups: {
      out: {
        position: 'bottom', // 链接桩位置
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
    items: [
      {
        id: 'out',
        group: 'out',
      },
    ],
  },
});
Graph.registerNode('input', InputNode, true);

export const TransformNode = DagNode.define({
  html: defaultHtml('Transform', 'table'),
  ports: {
    groups: {
      in: {
        position: 'top', // 链接桩位置
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      out: {
        position: 'bottom', // 链接桩位置
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
    items: [
      {
        id: 'in',
        group: 'in',
      },
      {
        id: 'out',
        group: 'out',
      },
    ],
  },
});
export const CubeNode = TransformNode.define({
  html: defaultHtml('Cube', 'agg'),
});
export const EtlNode = TransformNode.define({
  html: defaultHtml('ETL', 'etl'),
});

export const FilterNode = TransformNode.define({
  html: defaultHtml('Filter', 'filter'),
});
Graph.registerNode('transform', TransformNode, true);
Graph.registerNode('cube', CubeNode, true);
Graph.registerNode('etl', EtlNode, true);
Graph.registerNode('filter', FilterNode, true);

export const OutputNode = DagNode.define({
  html: defaultHtml('Output', 'output'),
  ports: {
    groups: {
      in: {
        position: 'top', // 链接桩位置
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
    items: [
      {
        id: 'in',
        group: 'in',
      },
    ],
  },
});
Graph.registerNode('output', OutputNode, true);

export class SimpleNodeView extends NodeView {
  protected renderMarkup(): void {
    this.renderJSONMarkup({
      tagName: 'rect',
      selector: 'body',
    });
  }

  update(): void {
    super.update({
      body: {
        refWidth: '100%',
        refHeight: '100%',
        fill: '#5f95ff',
      },
    });
  }
}
