import './style.css'
import { plainText as osmInput } from './data/tempe_split.osm';

console.log(osmInput);

document.querySelector('#app').innerHTML = `osmInput is ${osmInput.length}`;
