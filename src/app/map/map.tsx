"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React from "react";
import { PlaceSearchInput } from "./components/PlaceSearchInput";

export const Map = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const markerRef =
    React.useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  React.useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: "weekly",
      });

      const { AdvancedMarkerElement, PinElement } = await loader.importLibrary(
        "marker"
      );
      const { Map } = await loader.importLibrary("maps");

      const position = {
        lat: 43.642693,
        lng: -79.38711889,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NETJS_MAPID",
      };
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const pin = new PinElement({
        scale: 1.5,
        background: "white",
        borderColor: "red",
      });

      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        gmpDraggable: true,
        title: "New position",
        gmpClickable: true,
        content: pin.element,
      });

      // Guarda el marcador en una referencia para poder actualizarlo después
      markerRef.current = marker;

      // Escucha el evento click del mapa para mover el marcador
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng && markerRef.current) {
          // Actualiza la posición del marcador
          markerRef.current.position = e.latLng;
        }
      });
    };

    initMap();
  }, []);

  return (
    <>
      <PlaceSearchInput />
      <div className="h-[600px]" ref={mapRef}></div>
    </>
  );
};
