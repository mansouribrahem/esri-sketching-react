import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import { useEffect, useRef, useState } from "react";
import MapWidgets from "./widgets";
import AddLayers from "./Layers";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";

const AppMap = () => {
  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [map, setMap] = useState(null);
  const sketchLayer = new GraphicsLayer({
    id: "sketch",
  });

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        basemap: "streets",
        layers: [sketchLayer],
      });

      const mapView = new MapView({
        container: mapRef.current,
        map: map,
        zoom: 5,
        center: [31, 31],
      });

      setView(mapView);
      setMap(map);
    }
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "599px" }}></div>
      {view && <MapWidgets view={view} />}
      {map && <AddLayers map={map} view={view} />}
    </>
  );
};

export default AppMap;
