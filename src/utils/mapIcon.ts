import Leaflet from 'leaflet';
import mapMarker from '../assets/mapmarker.png';
const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,

  iconSize: [25, 35],
  iconAnchor: [25, 35],
  popupAnchor: [170, 2],
});

export default mapIcon;
