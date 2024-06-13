import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Home from "@arcgis/core/widgets/Home.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import { useEffect } from "react";

const MapWidgets = ({ view }) => {
  useEffect(() => {
    if (view) {
      const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "satellite",
      });

      const homeWidget = new Home({
        view,
      });
      const legend = new Legend({
        view: view,
      });

      const layerList = new LayerList({
        view: view,
      });
      basemapToggle && view.ui.add(basemapToggle, "bottom-right");
      homeWidget && view.ui.add(homeWidget, "top-left");
      legend && view.ui.add(legend, "bottom-right");
      layerList && view.ui.add(layerList, "bottom-left");
      
    }
  }, []);
};

export default MapWidgets;
