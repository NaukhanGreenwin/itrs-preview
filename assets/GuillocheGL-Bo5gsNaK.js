import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{d as t,t as n}from"./react-bWT_tSxf.js";import{a as r,i,n as a,r as o,t as s}from"./three-DabdLk5T.js";var c=e(t(),1),l=n(),u=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`,d=`
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uScroll;
uniform float uDpr;

float ln(float f, float w) {
  float fw = max(fwidth(f), 1e-4);
  float d = abs(fract(f - 0.5) - 0.5) / fw;
  float a = clamp(w * 0.5 + 0.5 - d, 0.0, 1.0);
  return a * (1.0 - smoothstep(0.24, 0.5, fw));
}
float ring(float r, float r0, float w) {
  float fw = max(fwidth(r), 1e-5);
  return clamp(w * 0.5 + 0.5 - abs(r - r0) / fw, 0.0, 1.0);
}
float win(float x, float a, float b, float s) { return smoothstep(a, a + s, x) * (1.0 - smoothstep(b - s, b, x)); }

void main() {
  vec2 c = uRes * 0.5;
  float R = min(uRes.x, uRes.y) * 0.475;
  vec2 p = (gl_FragCoord.xy - c) / R;
  vec2 m = (uMouse - c) / R;
  vec2 dm = p - m;
  float g = exp(-dot(dm, dm) * 6.0) * uHover;
  p -= dm * g * 0.085;
  float t = uTime;
  float s = uScroll;
  float r = length(p);
  float th = atan(p.y, p.x);
  float br = 0.5 + 0.5 * sin(t * 0.32);
  float w = max(1.0, 0.8 * uDpr) * (1.0 + g * 0.55);

  // outer woven band: two crossing wave families, phase drifting with radius
  float th1 = th + s * 0.42 + t * 0.006;
  float amp = 0.03 * (1.0 - 0.45 * s) * (0.9 + 0.1 * br);
  float sp = max(6.0, 3.6 * uDpr);
  float dens = (R / sp) * (1.0 + 0.18 * s);
  float fA = (r - amp * sin(16.0 * th1 + 24.0 * r + t * 0.05)) * dens;
  float fB = (r - amp * sin(16.0 * th1 - 24.0 * r - t * 0.05)) * dens;
  float mBand = win(r, 0.665, 0.955, 0.006);

  // inner petal rings (rose), counter-rotating
  float th2 = th - s * 0.3 - t * 0.008;
  float k = 0.1 + 0.025 * br - 0.04 * s;
  float q1 = r / (0.6 * (1.0 - k + k * cos(12.0 * th2)));
  float q2 = r / (0.6 * (1.0 - k + k * cos(12.0 * th2 + 0.2618)));
  float nP = (0.6 * R / (sp * 1.15)) * (1.0 + 0.2 * s);
  float mP1 = 1.0 - smoothstep(0.985, 1.0, q1);
  float mP2 = 1.0 - smoothstep(0.985, 1.0, q2);
  float hub = smoothstep(0.075, 0.08, r);

  // fine radial engraving in the gap
  float fR = (th1 / 6.2831853) * floor(6.2831853 * 0.63 * R / (sp * 1.4)) + sin(r * 60.0) * 0.6;
  float mGap = win(r, 0.618, 0.648, 0.003);

  float aG = max(ln(fA, w) * mBand, ln(q1 * nP, w) * mP1 * hub);
  aG = max(aG, ring(r, 0.61, w));
  aG = max(aG, ring(r, 0.072, w));
  aG = max(aG, ring(r, 0.655, w));
  aG = max(aG, ring(r, 0.965, w));
  aG = max(aG, ring(r, 0.985, w * 0.9));
  aG = max(aG, ring(r, 1.0, w * 1.3));
  float aK = max(ln(fB, w) * mBand * 0.62, ln(q2 * nP, w) * mP2 * hub * 0.55);
  aK = max(aK, ln(fR, w) * mGap * 0.5);

  vec3 col = vec3(1.0);
  col = mix(col, vec3(0.231, 0.227, 0.215), aK * 0.75);
  col = mix(col, vec3(0.118, 0.231, 0.184), aG * (0.8 + 0.2 * g));
  gl_FragColor = vec4(col, 1.0);
}
`;function f({shared:e,onFirst:t}){let{gl:n,size:s}=o(),f=(0,c.useMemo)(()=>new i({vertexShader:u,fragmentShader:d,uniforms:{uRes:{value:new r(1,1)},uTime:{value:0},uMouse:{value:new r(-9999,-9999)},uHover:{value:0},uScroll:{value:0},uDpr:{value:1}},depthTest:!1,depthWrite:!1}),[]),p=(0,c.useRef)(!1),m=(0,c.useRef)(0);return a((r,i)=>{let a=n.getPixelRatio(),o=f.uniforms;if(o.uRes.value.set(s.width*a,s.height*a),o.uDpr.value=a,o.uTime.value=r.clock.elapsedTime+40,performance.now()-e.lastMove>2600){let t=r.clock.elapsedTime*.12,n=Math.min(s.width,s.height)*.36;e.mouse.x=s.width/2+Math.cos(t)*n,e.mouse.y=s.height/2+Math.sin(t*.8)*n,e.target=.55}e.hover+=(e.target-e.hover)*Math.min(1,i*2.2);let c=o.uMouse.value,l=e.mouse.x*a,u=(s.height-e.mouse.y)*a;c.x<-9e3&&c.set(l,u),c.x+=(l-c.x)*Math.min(1,i*3.5),c.y+=(u-c.y)*Math.min(1,i*3.5),o.uHover.value=e.hover,m.current+=(e.scroll-m.current)*Math.min(1,i*2.5),o.uScroll.value=m.current,p.current||(p.current=!0,requestAnimationFrame(()=>t()))}),(0,l.jsx)(`mesh`,{frustumCulled:!1,material:f,children:(0,l.jsx)(`planeGeometry`,{args:[2,2]})})}function p({shared:e,vis:t,onFirst:n}){return(0,l.jsx)(s,{dpr:[1,2],frameloop:t?`always`:`never`,gl:{antialias:!1,alpha:!1,powerPreference:`low-power`},orthographic:!0,camera:{position:[0,0,1]},onCreated:({gl:e})=>e.setClearColor(`#ffffff`,1),children:(0,l.jsx)(f,{shared:e,onFirst:n})})}export{p as default};