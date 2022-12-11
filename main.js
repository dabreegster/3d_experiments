import './style.css'
import { plainText as osmInput } from './data/tempe_split.osm';
//import init, { JsStreetNetwork } from "osm2streets-js";
import { JsStreetNetwork } from "osm2streets-js";

//await init();

console.log(osmInput);

document.querySelector('#app').innerHTML = `osmInput is ${osmInput.length}`;
