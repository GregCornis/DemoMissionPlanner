import {Map, View, Feature} from 'ol';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import {fromLonLat} from 'ol/proj.js';
import Point from 'ol/geom/Point.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {Circle, Fill, Stroke, Style} from 'ol/style.js';
import { TileWMS } from 'ol/source';

 const fill = new Fill({
   color: 'rgb(228, 0, 0)',
 });
 const stroke = new Stroke({
   color: '#FF0000',
   width: 1.25,
 });
 const style = 
   new Style({
     image: new Circle({
       fill: fill,
       radius: 5,
     }),
     fill: fill,
     stroke: stroke,
   });

const mapDiv = document.getElementById("map");

const campaigns = mapDiv.dataset.campaigns;

console.log("Received campaigns " + campaigns[0] + campaigns[1] + campaigns[2] + campaigns[3] + campaigns[4] + campaigns[5]);

// const turbines = campaigns.flatMap((c) => 
//   c.map((t) => 
//     // {
//     //   name: t.name, farm: c.name, latitude: t.latitude, longitude: t.longitude
//     // }
//     t.name

//   )
// );



const turbines = [
  {name: "E1", farm: "Haute Lys", latitude: 50.576870281523, longitude: 2.1943177983451685},
  {name: "E2", farm: "Haute Lys", latitude: 50.597062294000644, longitude: 2.115397209334834},
  {name: "E3", farm: "La Crête Tarlare", latitude: 48.661119, longitude: 4.05781},
  {name: "E3", farm: "La Crête Tarlare", latitude: 49.972044, longitude: 2.021289},
]

let point = new Feature({
  geometry: new Point(fromLonLat([2.896372, 46.6024])),
  style: style
});

let points = turbines.map ((t) =>
  new Feature({
    geometry: new Point(fromLonLat([t.longitude, t.latitude])),
    name: t.name
  })
);

points.forEach(point => {
  point.setStyle(style)
  console.log("Style " + style)
});

const vectorSource = new VectorSource({
  features: points,
});

let vectorLayer = new VectorLayer({
  source: vectorSource,
});

const map = new Map({
  target: 'map',  // Id of target div
  layers: [
    // new TileLayer({
    //   source: new OSM()
    // }),
    new TileLayer({
      source: new TileWMS(({
        url: "https://data.geopf.fr/wms-r/wms?SERVICE=WMS&VERSION=1.3.0&source=TRANSPORTS.DRONES.RESTRICTIONS%3Acarte_restriction_drones_lf",
        params: {'TILED': true},
      }))
    }),
    vectorLayer
  ],
  view: new View({
    center: fromLonLat([2.896372, 46.6024]),
    zoom: 5
  })
});
