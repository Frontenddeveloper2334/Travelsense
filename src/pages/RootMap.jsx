import React from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function RouteMap({ from, to }) {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 pb-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center sm:text-left">
        Distance Map from {from.name} to {to.name}
      </h2>

      <MapContainer
        center={[from.latitude, from.longitude]}
        zoom={4}
        scrollWheelZoom={true}
        className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[420px] w-full rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Polyline
          positions={[
            [from.latitude, from.longitude],
            [to.latitude, to.longitude],
          ]}
          color="#2563eb"
          weight={4}
        />

        <Marker position={[from.latitude, from.longitude]}>
          <Popup>{from.name}</Popup>
        </Marker>

        <Marker position={[to.latitude, to.longitude]}>
          <Popup>{to.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
