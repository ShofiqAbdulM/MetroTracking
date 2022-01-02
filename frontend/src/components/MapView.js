import React from 'react';
import { Switch, Route } from "react-router-dom";

import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as parkData from "../data/datadriver.json";
import RoutingMachine from "./RoutingMachine";


export const icon = new L.Icon({
    iconUrl: "/Truck.svg",
    iconSize: [50, 50]
});
const MapComponent = (props) => {
    const [activePark, setActivePark] = React.useState(null);

    return (
        <Map center={[-7.983908, 112.621391]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">MetroTracking</a>'
            />

            {parkData.features.map(park => (
                <Marker
                    key={park.properties.PARK_ID}
                    position={[
                        park.geometry.coordinates[1],
                        park.geometry.coordinates[0]
                    ]}
                    onClick={() => {
                        setActivePark(park);
                    }}
                    icon={icon}
                />
            ))}

            {activePark && (
                <Popup
                    position={[
                        activePark.geometry.coordinates[1],
                        activePark.geometry.coordinates[0]
                    ]}
                    onClose={() => {
                        setActivePark(null);
                    }}
                >
                    <div>
                        <h2>{activePark.properties.NAME}</h2>
                        <p>{activePark.properties.DESCRIPTIO}</p>
                    </div>
                </Popup>
            )}
            <Switch>
                <Route component={RoutingMachine} />
            </Switch>
        </Map>
    );
};

export default MapComponent;
