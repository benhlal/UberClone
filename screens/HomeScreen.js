import React from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import GlobalStyles from "../GlobalStyles";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIsKEY } from "@env";
import { setDestination, setOrigin } from "../dataManagement/slices/navSlice";
import { useDispatch } from "react-redux";
import NavFavorite from "../components/NavFavorite";

export default function HomeScreen() {
  const dispatchAction = useDispatch();

  return (
    <SafeAreaView
      style={[tw`bg-white h-full items-center`, GlobalStyles.AndroidSafeArea]}
    >
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />

        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
              backgroundColor: "#F5F5F5",
            },
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatchAction(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatchAction(setDestination(null));
          }}
          placeholder="Pick a pick up point"
          query={{
            key: GOOGLE_MAPS_APIsKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={100}
          enablePoweredByContainer={false}
        />
        <NavOptions />
        <NavFavorite />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
