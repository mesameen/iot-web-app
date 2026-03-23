import { LatLngExpression } from "leaflet";
import { Map, MapTileLayer } from "../ui/map";

export const CustomMap = () => {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression;
    return (
        <Map center={TORONTO_COORDINATES} zoom={12}>
            <MapTileLayer></MapTileLayer>
        </Map>
    )
}

