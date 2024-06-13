import CSVLayer from "@arcgis/core/layers/CSVLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";

import { useEffect } from "react";

const AddLayers = ({ map, view }) => {
  useEffect(() => {
    const graphicAttr = {
      Name: "Smiley",
      Mood: "Happy",
      Reason: "https://www.youtube.com/watch?v=hy1I25JFjX0",
    };
    var myPopupTemplate = {
      title: "{Loc_Eng}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "Total_Pop",
              // label: "Population"
            },
            {
              fieldName: "Total_M",
              label: "Male",
            },
            {
              fieldName: "Total_Fe",
              label: "Female",
            },
          ],
        },
      ],
    };
    const csvLayer = new CSVLayer({
      url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",
    });
    ///////////////
    const featureLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/nEMEkLg8rZV7Ijyb/ArcGIS/rest/services/SudanMap/FeatureServer/2",
      attributes: graphicAttr,
      popupTemplate: myPopupTemplate,
    });
    //////////////
    const pointGeometry = {
      type: "point",
      longitude: 0,
      latitude: 0,
    };

    const markerSymbol = {
      type: "simple-marker",
      color: "red",
      size: 35,
    };

    let graphicA = new Graphic({
      geometry: pointGeometry,
      symbol: markerSymbol,
      attributes: graphicAttr,
      popupTemplate: {
        title: "{Name}",
        content: "{Reason}",
      },
    });
    const graphicsLayer = new GraphicsLayer({
      graphics: [graphicA],
    });
    ////////////////////
    const sketchLayer = view.map.findLayerById("sketch");

    const sketch = new Sketch({
      layer: sketchLayer,
      view: view,
    });

    sketch && view.ui.add(sketch, "top-right");

    map.add(csvLayer);
    map.add(featureLayer);
    map.add(graphicsLayer);
  }, []);
  return <></>;
};

export default AddLayers;
