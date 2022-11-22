import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-webgl-study',
  templateUrl: './webgl-study.component.html',
  styleUrls: ['./webgl-study.component.less'],
})
export class WebglStudyComponent implements AfterViewInit {
  @ViewChild('demo1')
  demo1Container!: ElementRef;
  @ViewChild('demo2')
  demo2Container!: ElementRef;
  @ViewChild('demo3')
  demo3Container!: ElementRef;
  @ViewChild('demo4')
  demo4Container!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.demo_1();
    this.demo_2();

    this.demo_3();
  }

  // Fill the buffer with the values that define a triangle.
  setGeometry(gl: WebGL2RenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, -100, 150, 125, -175, 100]),
      gl.STATIC_DRAW
    );
  }
  demo_3(): void {
    const vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

// all shaders have a main function
void main() {

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

    const fragmentShaderSource = `#version 300 es

precision highp float;

uniform vec4 u_color;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = u_color;
}
`;

    // Get A WebGL context
    const gl = this.getWebGL2(this.demo3Container);

    // Use our boilerplate utils to compile the shaders and link into a program
    const program = this.createProgramFromSources(
      gl,
      vertexShaderSource,
      fragmentShaderSource
    );

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position'
    );

    // look up uniform locations
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      'u_resolution'
    );
    const colorLocation = gl.getUniformLocation(program, 'u_color');

    // Create a buffer
    const positionBuffer = gl.createBuffer();

    // Create a vertex array object (attribute state)
    const vao = gl.createVertexArray();

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
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

    this.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    // Pass in the canvas resolution so we can convert from
    // pixels to clipspace in the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // draw 50 random rectangles in random colors
    for (let ii = 0; ii < 50; ++ii) {
      // Put a rectangle in the position buffer
      this.setRectangle(
        gl,
        this.randomInt(300),
        this.randomInt(300),
        this.randomInt(300),
        this.randomInt(300)
      );

      // Set a random color.
      gl.uniform4f(
        colorLocation,
        Math.random(),
        Math.random(),
        Math.random(),
        1
      );

      // Draw the rectangle.
      const primitiveType = gl.TRIANGLES;
      const offset = 0;
      const count = 6;
      gl.drawArrays(primitiveType, offset, count);
    }
  }

  // Returns a random integer from 0 to range - 1.
  randomInt(range: number): number {
    return Math.floor(Math.random() * range);
  }

  // Fill the buffer with the values that define a rectangle.
  setRectangle(
    gl: WebGL2RenderingContext,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
      gl.STATIC_DRAW
    );
  }
  demo_2(): void {
    const gl = this.getWebGL2(this.demo2Container);

    const vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

// all shaders have a main function
void main() {

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  // gl_Position = vec4(clipSpace, 0, 1);
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

    const fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  // Just set the output to a constant redish-purple
  outColor = vec4(1, 0, 0.5, 1);
}
`;

    // Get A WebGL context

    // Use our boilerplate utils to compile the shaders and link into a program
    const program = this.createProgramFromSources(
      gl,
      vertexShaderSource,
      fragmentShaderSource
    );

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position'
    );

    // look up uniform locations
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      'u_resolution'
    );

    // Create a buffer and put a single pixel space rectangle in
    // it (2 triangles)
    // Create a buffer and put three 2d clip space points in it
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create a vertex array object (attribute state)
    const vao = gl.createVertexArray();

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
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

    this.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    // Pass in the canvas resolution so we can convert from
    // pixels to clipspace in the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // draw
    const primitiveType = gl.TRIANGLES;
    const offsetDraw = 0;
    const count = 6;
    gl.drawArrays(primitiveType, offsetDraw, count);
  }

  demo_1(): void {
    const gl = this.getWebGL2(this.demo1Container);

    const vertexShaderSource = `#version 300 es

    // an attribute is an input (in) to a vertex shader.
    // It will receive data from a buffer
    in vec4 a_position;

    // all shaders have a main function
    void main() {

      // gl_Position is a special variable a vertex shader
      // is responsible for setting
      gl_Position = a_position;
    }
    `;

    const fragmentShaderSource = `#version 300 es

    // fragment shaders don't have a default precision so we need
    // to pick one. highp is a good default. It means "high precision"
    precision highp float;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      // Just set the output to a constant redish-purple
      outColor = vec4(1, 0, 0.5, 1);
    }
    `;

    // create GLSL shaders, upload the GLSL source, compile the shaders
    const vertexShader = this.createShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    // Link the two shaders into a program
    const program = this.createProgram(gl, vertexShader, fragmentShader);

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position'
    );

    // Create a buffer and put three 2d clip space points in it
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [0, 0, 0, 0.5, 0.7, 0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create a vertex array object (attribute state)
    const vao = gl.createVertexArray();

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
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

    this.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0.1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    // draw
    const primitiveType = gl.TRIANGLES;
    const offsetDraw = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offsetDraw, count);
  }

  /**
   * Resize a canvas to match the size its displayed.
   * @param canvas The canvas to resize.
   * @param [multiplier] amount to multiply by.
   *    Pass in window.devicePixelRatio for native pixels.
   * @return true if the canvas was resized.
   */
  resizeCanvasToDisplaySize(
    canvas: HTMLCanvasElement,
    multiplier = 1
  ): boolean {
    multiplier = multiplier || 1;
    const width = canvas.clientWidth * multiplier || 0;
    const height = canvas.clientHeight * multiplier || 0;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }
  createProgramFromSources(
    gl: WebGL2RenderingContext,
    vertexSource: string,
    fragmentSource: string
  ): WebGLProgram {
    const program = gl.createProgram();
    if (!program) {
      throw new Error('create program fail');
    }

    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentSource
    );
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      console.log(gl.getProgramInfoLog(program)); // eslint-disable-line
      gl.deleteProgram(program);
      throw new Error('link shader fail');
    }
    return program;
  }

  createShader(
    gl: WebGL2RenderingContext,
    type: number,
    source: string
  ): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error('fail create shader');
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      console.log(gl.getShaderInfoLog(shader)); // eslint-disable-line
      gl.deleteShader(shader);
      throw new Error('compile shader fail');
    }
    return shader;
  }

  createProgram(
    gl: WebGL2RenderingContext,
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
      console.log(gl.getProgramInfoLog(program)); // eslint-disable-line
      gl.deleteProgram(program);
      throw new Error('link shader fail');
    }
    return program;
  }

  getWebGL2(demoContainer: ElementRef): WebGL2RenderingContext {
    const dom = demoContainer.nativeElement as HTMLCanvasElement;
    const ctx = dom.getContext('webgl2') as WebGL2RenderingContext;
    if (!ctx) {
      throw new Error('fail init context webgl2');
    }
    return ctx;
  }
}
