const fragmentSource = `
  uniform vec2 dimensions;
  uniform sampler2D humanTexture;

  uniform float zoom;

  void main() {
    float d = zoom;
    float p = 0.65;

    vec2 screenCoords = gl_FragCoord.xy/dimensions.xy;
    screenCoords.y = 1.0 - screenCoords.y;

    vec2 tilingCoords = screenCoords;
    tilingCoords -= 0.5 + vec2(p, 1.0) / d * 0.5;
    tilingCoords *= d / vec2(p, 1.0);

    vec2 texCoords = fract(tilingCoords);
    texCoords.x *= p;
    texCoords.x += (1.0-p) * 0.5;
    // texCoords += floor(tilingCoords);

    // gl_FragColor = vec4(st, 0.0, 1.0);
    gl_FragColor = texture2D(humanTexture, texCoords);
  }
`;

const slider = document.getElementById('zoomSlider');
let zoom = slider.value;

slider.oninput = () => {
  zoom = slider.value;
}

const width = 1024;
const height = 1024;

const app = new PIXI.Application({
  width: width,
  height: height,
});

const { stage, view, ticker, renderer, loader } = app;

document.body.appendChild(view);

loader.add('human.png').load(setup);

function setup() {
  let humanTexture = loader.resources['human.png'].texture;

  var shader = new PIXI.Filter(undefined, fragmentSource, undefined);
  shader.uniforms.dimensions = [width, height];
  shader.uniforms.humanTexture = humanTexture;
  var bg = new PIXI.Sprite();
  bg.width = width;
  bg.height = height;
  bg.blendMode = PIXI.BLEND_MODES.ADD;
  bg.filters = [shader];
  stage.addChild(bg);

  ticker.add(() => {
    shader.uniforms.zoom = zoom;
  });
}




// var count = 0;
// ticker.add(() => {
//   count += 0.01
//   smokeShader.uniforms.time = count;
// });
