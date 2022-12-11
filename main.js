import './style.css'
import { plainText as geojsonInput } from './data/tempe_split.geojson';

console.log(geojsonInput);

document.querySelector('#app').innerHTML = `${geojsonInput.length}`;
