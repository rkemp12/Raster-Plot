function _1(md){return(
md`# Hypothesis: There were more fires last year than this year in September`
)}

function _chart(html,n,m,contours,values,svg,path,color){return(
html`<h2>September 2022</h2><svg style="width: 100%; height: auto; display: block;" viewBox="0 0 ${n} ${m}">
  ${Array.from(contours(values), d => svg`<path d="${path(d)}" fill="${color(d.value)}" />`)}
</svg><h2>September 2021</h2><br>`
)}
function _chart2(html,n,m,contours,values,svg,path,color){return(
  html`<svg style="width: 100%; height: auto; display: block;" viewBox="0 0 ${n} ${m}">
    ${Array.from(contours(values), d => svg`<path d="${path(d)}" fill="${color(d.value)}" />`)}
  </svg>`
  )}

function _path(d3){return(
d3.geoPath()
)}

function _contours(d3,n,m){return(
d3.contours()
    .size([n, m])
    .smooth(false)
    .thresholds(20)
)}

function _color(d3,values){return(
d3.scaleSequential(d3.extent(values), d3.interpolateMagma)
)}

function _image(tiff){return(
tiff.getImage()
)}

async function _values(image){return(
(await image.readRasters())[0]
)}

function _n(image){return(
image.getWidth()
)}

function _m(image){return(
image.getHeight()
)}

function _tiff(FileAttachment,GeoTIFF){return(
FileAttachment("raster.TIFF").arrayBuffer()
  .then(buffer => GeoTIFF.fromArrayBuffer(buffer))
)}
function _tiff2(FileAttachment2, GeoTIFF){return(
  FileAttachment2("raster2.TIFF").arrayBuffer()
  .then(buffer => GeoTIFF.fromArrayBuffer(buffer))
)}

function _GeoTIFF(require){return(
require("geotiff@1.0.0-beta.13")
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["raster.TIFF", {url: new URL("./raster.TIFF", import.meta.url), mimeType: "image/tiff", toString}]
  ]);
  const fileAttachments2 = new Map([ 
    ["raster2.TIFF", {url: new URL("./raster2.TIFF", import.meta.url), mimeType: "image/tiff", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["html","n","m","contours","values","svg","path","color"], _chart);
  main.variable(observer("chart2")).define("chart2", ["html", "n", "m", "contours", "values", "svg", "path", "color"], _chart2)
  main.variable(observer("path")).define("path", ["d3"], _path);
  main.variable(observer("contours")).define("contours", ["d3","n","m"], _contours);
  main.variable(observer("color")).define("color", ["d3","values"], _color);
  main.variable(observer("image")).define("image", ["tiff"], _image);
  main.variable(observer("values")).define("values", ["image"], _values);
  main.variable(observer("n")).define("n", ["image"], _n);
  main.variable(observer("m")).define("m", ["image"], _m);
  main.variable(observer("tiff")).define("tiff", ["FileAttachment","GeoTIFF"], _tiff);
  main.variable(observer("tiff2")).define("tiff2", ["FileAttachment2", "GeoTIFF"], _tiff2);
  main.variable(observer("GeoTIFF")).define("GeoTIFF", ["require"], _GeoTIFF);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
