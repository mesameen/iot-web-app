import { Map, MapMarker, MapPopup, MapTileLayer, MapZoomControl } from "../ui/map"

export const CustomMap = () => {
    return (
        <Map center={[43.6532, -79.3832]}>
            <MapTileLayer></MapTileLayer>
            <MapZoomControl></MapZoomControl>
            <MapMarker position={[43.6532, -79.3832]}>
                <MapPopup>A map center for shadcn/ui</MapPopup>
            </MapMarker>
        </Map>
    )
}