import { GOOGLE_MAPS_APIsKEY } from "@env";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../dataManagement/slices/navSlice";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);

  const actionDispatcher = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
    return () => {};
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIsKEY}`;

      fetch(URL)
        .then((res) => res.json())
        .then((data) => {r
          actionDispatcher(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();

    return () => {};
  }, [origin, destination, GOOGLE_MAPS_APIsKEY]);
  return (
    <MapView
      ref={mapRef}
      provider={"google"}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location.lat,
        longitude: origin?.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin?.description}
          destination={destination?.description}
          apikey={GOOGLE_MAPS_APIsKEY}
          strokeColor="black"
          strokeWidth={4}
          lineDashPattern={[1]}
        />
      )}

      {origin?.location && (
        <Marker
          size={9}
          pinColor={"blue"}
          identifier="origin"
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Departure"
          description={origin.description}
          s
          type="antdesign"
        />
      )}

      {destination?.location && (
        <Marker
          identifier="destination"
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Departure"
          description={destination.description}
          color="white"
          type="antdesign"
          pinColor={"green"}
          size={9}
        />
      )}
    </MapView>
  );
};

export default Map;
