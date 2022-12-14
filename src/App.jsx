import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Search from '@arcgis/core/widgets/Search';

import "./App.css";

function App() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c"
        }
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [-118.80543,34.02700],
        zoom: 13
      });

      const popupTrailheads = {
        "title": "Trailhead",
        "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
      }

       const trailheads = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
        outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
        popupTemplate: popupTrailheads,
        apiKey: "AAPK0d85f90f81564bd29e37798cd6905282OYb_9h6pgs1GSJ1FKXqKXzqxYTepMfo1NJ-EKRN5y2cEIPOIP9do2PxgSqq3P7kK"
      });

      webmap.add(trailheads);
      const search = new Search({  //Add Search widget
        view: view
      });
     
    view.ui.add(search, "top-right"); //Add to the map
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
