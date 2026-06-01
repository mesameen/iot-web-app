import { LatLngExpression } from "leaflet";
import { Map, MapTileLayer } from "../ui/map";

export const CustomMap = () => {
    const TORONTO_COORDINATES = [24.34314, 54.52080] satisfies LatLngExpression;
    return (
        <Map center={TORONTO_COORDINATES} zoom={10}>
            <MapTileLayer></MapTileLayer>
        </Map>
    )
}

