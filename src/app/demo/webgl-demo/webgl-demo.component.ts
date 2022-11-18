import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-webgl-demo',
  templateUrl: './webgl-demo.component.html',
  styleUrls: ['./webgl-demo.component.less'],
})
export class WebglDemoComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvasContainer!: ElementRef;
  constructor() {}
  ngAfterViewInit(): void {
    console.log('simple');
    // canvas 元素
    const canvas = this.canvasContainer.nativeElement;
    if (!canvas) {
      console.log('failed to retrieve the <canvas> element');
      return;
    }

    // GL上下文
    const gl: WebGL2RenderingContext | null = canvas.getContext('webgl2', {
      antialias: true,
    });
    if (!gl) {
      console.log('failed to retrieve webgl context from canvas');
      return;
    }

    const vertexShader = this.createShader(
      gl,
      gl.VERTEX_SHADER,
      `#version 300 es
      // an attribute is an input (in) to a vertex shader.
      // It will receive data from a buffer
      in vec4 a_position;

      // all shaders have a main function
      void main() {

        // gl_Position is a special variable a vertex shader is responsible for setting
        gl_Position = a_position;
      }`
    );

    const fragmentShader = this.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      `#version 300 es

      // fragment shaders don't have a default precision so we need to pick one.
      // highp is a good default. It means "high precision"
      precision highp float;

      // we need to declare an output for the fragment shader
      out vec4 outColor;

      void main() {
        // Just set the output to a constant reddish-purple
        outColor = vec4(1, 0, 0.5, 1);
      }`
    );
    const program = this.createProgram(gl, vertexShader, fragmentShader);

    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position'
    );
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [0, 0, 0, 0.5, 0.7, 0];
    // 最后一个参数gl.STATIC_DRAW提示WebGL如何使用数据，WebGL据此做相应的优化。gl.STATIC_DRAW 告诉WebGL我们不太可能去改变数据的值。
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Bind the attribute/buffer set we want.
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    // 数据存放到缓存区后，接下来需要告诉属性如何从缓冲区取出数据。

    gl.enableVertexAttribArray(positionAttributeLocation);
    const size = 2; // 2 components per iteration
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    this.resizeCanvasToDisplaySize(canvas);
    // 告诉 webgl 如何将 0 到 1 坐标 变为屏幕上的坐标
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const primitiveType = gl.TRIANGLES;
    const offsetArray = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offsetArray, count);
  }
  resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
    // 获取浏览器显示的画布的CSS像素值
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // 检查画布大小是否相同。
    const needResize =
      canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
      // 使画布大小相同
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
    return needResize;
  }
  darw2(): void {
    console.log('simple');
    // canvas 元素
    const canvas = this.canvasContainer.nativeElement;
    if (!canvas) {
      console.log('failed to retrieve the <canvas> element');
      return;
    }
    canvas.width = 600;
    canvas.height = 600;
    // GL上下文
    const gl: WebGLRenderingContext | null = canvas.getContext('webgl2', {
      antialias: true,
    });
    if (!gl) {
      console.log('failed to retrieve webgl context from canvas');
      return;
    }

    // 1
    // 告诉 webgl 如何将 0 到 1 坐标 变为屏幕上的坐标
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const program = this.createProgramFromSource(
      gl,
      `#version 300 es
    in vec4 aPos;
    in vec4 aColor;
    out vec4 vColor;

    void main() {
      gl_Position = aPos;
      vColor = aColor;
    }
    `,
      `
    precision mediump float;
    in vec4 vColor;

    void main() {
      gl_FragColor = vColor;
    }
    `
    );

    const points = new Float32Array([
      -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5,
      0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
    ]);
    const colors = new Float32Array([
      1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);

    const [posLoc, posBuffer] = this.createAttrBuffer(
      gl,
      program,
      'aPos',
      points
    );
    const [colorLoc, colorBuffer] = this.createAttrBuffer(
      gl,
      program,
      'aColor',
      colors
    );
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    const indices = new Uint8Array([
      0,
      1,
      2,
      0,
      2,
      3, // 前
      1,
      4,
      2,
      4,
      7,
      2, // 右
      4,
      5,
      6,
      4,
      6,
      7, // 后
      5,
      3,
      6,
      5,
      0,
      3, // 左
      0,
      5,
      4,
      0,
      4,
      1, // 上
      7,
      6,
      3,
      7,
      3,
      2, // 下
    ]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    // 深度测试，这样后画的三角形就不会覆盖先画的，而是根据它们的 Z 值判断。
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 1, 1, 1);
    // tslint:disable-next-line: no-bitwise
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawElements(
      gl.TRIANGLES, // 要渲染的图元类型
      indices.length, // 要渲染的元素数量
      gl.UNSIGNED_BYTE, // 元素数组缓冲区中的值的类型
      0 // 元素数组缓冲区中的偏移量, 字节单位
    );
  }
  createProgram(
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram {
    const program = gl.createProgram();
    if (!program) {
      throw new Error('create program fail');
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      throw new Error('link program fail');
    }
    return program;
  }
  createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error('create shader fail');
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error('compile shader fail');
    }
    return shader;
  }

  createProgramFromSource(
    gl: WebGLRenderingContext,
    vertex: string,
    fragment: string
  ): WebGLProgram {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertex);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    if (!program) {
      throw new Error('create program fail');
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
  }

  createBuffer(gl: WebGLRenderingContext, data: BufferSource): WebGLBuffer {
    const buffer = gl.createBuffer();
    if (!buffer) {
      throw new Error('create buffer fail');
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
  }

  createAttrBuffer(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    attr: string,
    data: BufferSource
  ): [number, WebGLBuffer] {
    const location = gl.getAttribLocation(program, attr);
    const buffer = this.createBuffer(gl, data);
    return [location, buffer];
  }

  draw1() {
    console.log('draw1');
    // canvas 元素
    const canvas = this.canvasContainer.nativeElement;
    if (!canvas) {
      console.log('failed to retrieve the <canvas> element');
      return;
    }
    canvas.width = 600;
    canvas.height = 600;
    // GL上下文
    const gl: WebGLRenderingContext | null = canvas.getContext('webgl2', {
      antialias: true,
    });
    if (!gl) {
      console.log('failed to retrieve webgl context from canvas');
      return;
    }

    // 1
    // 告诉 webgl 如何将 0 到 1 坐标 变为屏幕上的坐标
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // 2
    // 创建一个顶点着色器
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      console.log('create vertex shader fail');
      return;
    }
    // 编写顶点着色器代码
    gl.shaderSource(
      vertexShader,
      `
        attribute vec4 a_position;

        void main() {
          gl_Position = a_position; // 设置顶点位置
        }
      `
    );
    // 编译着色器代码
    gl.compileShader(vertexShader);

    // 3
    // 创建一个片元着色器
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      console.log('create fragment shader fail');
      return;
    }
    // 编写片元着色器代码
    gl.shaderSource(
      fragmentShader,
      `
        precision mediump float;
        uniform vec4 u_color;

        void main() {
          gl_FragColor = u_color; // 设置片元颜色
        }
      `
    );
    // 编译着色器代码
    gl.compileShader(fragmentShader);

    // 4
    // 创建一个程序
    const program = gl.createProgram();
    if (!program) {
      console.log('create program fail');
      return;
    }
    // 添加顶点着色器
    gl.attachShader(program, vertexShader);
    // 添加片元着色器
    gl.attachShader(program, fragmentShader);
    // 连接 program 中的着色器
    gl.linkProgram(program);
    // 告诉 webgl 用这个 program 进行渲染
    gl.useProgram(program);

    // 获取 u_color 变量位置
    const colorLocation = gl.getUniformLocation(program, 'u_color');
    // 设置它的值
    gl.uniform4f(colorLocation, 0.8, 0, 0.56, 1);

    // 获取 a_position 位置
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    // 创建一个顶点缓冲对象，返回其 ID，用来放三角形顶点数据，
    const positionBuffer = gl.createBuffer();
    // 将这个顶点缓冲对象绑定到 gl.ARRAY_BUFFER
    // 后续对 gl.ARRAY_BUFFER 的操作都会映射到这个缓存
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // 将顶点数据加入的刚刚创建的缓存对象
    gl.bufferData(
      gl.ARRAY_BUFFER,
      // 三角形的三个顶点
      // 因为会将数据发送到 GPU，为了省去数据解析，这里使用 Float32Array 直接传送数据
      new Float32Array([0, 0, 0.5, 0, -0.5, -0.5]),
      // 表示缓冲区的内容不会经常更改
      gl.STATIC_DRAW
    );
    // 告诉 OpenGL 如何从 Buffer 中获取数据
    gl.vertexAttribPointer(
      positionLocation, // 顶点属性的索引
      2, // 组成数量，必须是1，2，3或4。我们只提供了 x 和 y
      gl.FLOAT, // 每个元素的数据类型
      false, // 是否归一化到特定的范围，对 FLOAT 类型数据设置无效
      0, // stride 步长 数组中一行长度，0 表示数据是紧密的没有空隙，让OpenGL决定具体步长
      0 // offset 字节偏移量，必须是类型的字节长度的倍数。
    );
    // 开启 attribute 变量额，使顶点着色器能够访问缓冲区数据
    gl.enableVertexAttribArray(positionLocation);

    // 5 清空画布
    gl.clearColor(0, 1, 1, 1); // 设置清空颜色缓冲时的颜色值
    gl.clear(gl.COLOR_BUFFER_BIT); // 清空颜色缓冲区，也就是清空画布

    // 画图
    gl.drawArrays(
      // 从数组中绘制图元
      gl.TRIANGLES, // 画三角形
      0, // 从哪个点开始画
      3 // 需要用到多少个点
    );
  }
}
