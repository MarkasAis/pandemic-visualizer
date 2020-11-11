const fragmentSource = `
  uniform vec2 dimensions;
  uniform sampler2D humanTexture;

  uniform float zoom;
  uniform float radius;

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

    vec2 tileCoords = ceil(tilingCoords);

    float r = radius - 0.5;
    if (tileCoords.x*tileCoords.x*p*p + tileCoords.y*tileCoords.y > r*r) discard;

    // gl_FragColor = vec4(st, 0.0, 1.0);
    gl_FragColor = texture2D(humanTexture, texCoords);
  }
`;

const zoomSlider = document.getElementById('zoomSlider');
let zoom = zoomSlider.value;

zoomSlider.oninput = () => {
  zoom = zoomSlider.value;
}

const radiusSlider = document.getElementById('radiusSlider');
let radius = radiusSlider.value;

radiusSlider.oninput = () => {
  radius = radiusSlider.value;
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
    shader.uniforms.radius = radius;
  });
}




// var count = 0;
// ticker.add(() => {
//   count += 0.01
//   smokeShader.uniforms.time = count;
// });
