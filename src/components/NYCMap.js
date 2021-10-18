/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2h1YXVsbWUiLCJhIjoiY2tpNG81MmJiMDRhcTJ3cW9yc3E0NWxyNSJ9.gbmA72jjGvgwL-5YEpJnew";

// process.env.REACT_APP_MAPBOX_API_KEY;
const styles = {
  width: "100vw",
  height: "75vh",
};

const Marker = ({ rest, idx, topPicks }) => {
  let style = "px-2 text-white bg-red-700 rounded-full";

  if (idx < 3) {
    style = "px-2 text-white bg-mongo-600 rounded-full";
  }

  return (
    <div className={style}>
      😋 {idx + 1}. {rest.name}
    </div>
  );
};

const NYCMap = ({ restaurants }) => {
  let longitude, latitude, point;

  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(-73.98474);
  const [lat, setLat] = useState(40.76289);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    let topPicks = false;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // marker for the MongoDB New York office
    let marker = new mapboxgl.Marker({ color: "#c53030" })
      .setLngLat([-73.98474, 40.76289])
      .addTo(map);

    if (!restaurants || restaurants.length === 0) {
      return;
    }

    if (restaurants && restaurants.length > 0) {
      restaurants.map((rest, idx) => {
        if (idx < 3) {
          topPicks = true;
        }
        //create a React ref
        const ref = React.createRef();
        // Create a new DOM node and save it to the React ref
        ref.current = document.createElement("div");
        // Render a Marker Component on our new DOM node
        ReactDOM.render(
          <Marker rest={rest} idx={idx} topPicks={topPicks} />,
          ref.current
        );

        longitude = Object.values(rest.location.coordinates[0]);
        latitude = Object.values(rest.location.coordinates[1]);
        point = [longitude, latitude];

        new mapboxgl.Marker(ref.current)
          .setLngLat(point)
          .setPopup(
            new mapboxgl.Popup({ offset: 30 }).setHTML(
              "<h4>" + rest.name + "</h4>" + rest.address.street
            )
          )
          .addTo(map);
      });
    } // end if
  }, [restaurants]);

  return <div ref={(el) => (mapContainerRef.current = el)} style={styles} />;
};

export default NYCMap;
