const WIDTH = 640;
const HEIGHT = 320;

let cnv1, cnv2;
let bounds = [];
let source;

function setup() {
  let cnv = createCanvas(WIDTH, 2*HEIGHT);
  cnv.background(0);
  cnv.center("horizontal");

  cnv1 = createGraphics(WIDTH, HEIGHT);
  cnv2 = createGraphics(WIDTH, HEIGHT);
  
  bounds.push(new Boundary(0, 0, 0, HEIGHT));
  bounds.push(new Boundary(0, 0, WIDTH, 0));
  bounds.push(new Boundary(0, HEIGHT, WIDTH, HEIGHT));
  bounds.push(new Boundary(WIDTH, 0, WIDTH, HEIGHT));
  bounds.push(new Boundary(200, 100, 400, 300));
  bounds.push(new Boundary(400, 100, 300, 300));
  source = new Source(100, 100);
}

function draw() {
  let scene = [];
  cnv1.background(0);
  cnv2.background(20);

  //Canvas #1
  source.update();
  scene = source.look(cnv1, bounds);
  source.show(cnv1);
  for(bound of bounds) bound.show(cnv1);

  //Canvas #2
  let step = WIDTH/scene.length;
  for(let i=0; i<scene.length; i++){
    cnv2.noStroke();
    let dist = scene[i]*scene[i];
    let maxDist = WIDTH*WIDTH;
    let w = map(dist, 0, maxDist, 200, 0);
    let h = map(dist, 0, maxDist, HEIGHT, 0);
    cnv2.fill(w);
    cnv2.rect(i*step-1, (HEIGHT-h)/2, step+1, h);
  }

  image(cnv1, 0, 0);
  image(cnv2, 0, HEIGHT);
}