import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-demo',
  templateUrl: './canvas-demo.component.html',
  styleUrls: ['./canvas-demo.component.less'],
})
export class CanvasDemoComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvasContainer!: ElementRef;
  constructor() {}
  ngAfterViewInit(): void {
    console.log('simple');
    // canvas 元素
    const simpleCanvas = this.canvasContainer.nativeElement;
    if (!simpleCanvas) {
      console.log('failed to retrieve the <canvas> element');
      return;
    }
    // 绘图上下文
    const ctx = simpleCanvas.getContext('2d');
    if (!ctx) {
      console.log('failed to retrieve 2d context from canvas');
      return;
    }
    // 绘图
    ctx.fillStyle = 'reba(0, 0, 255, 1.0)';
    ctx.fillRect(120, 10, 150, 150);
  }
}
