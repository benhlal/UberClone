import { GOOGLE_MAPS_APIsKEY } from "@env";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import { Icon } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import NavFavorite from "../components/NavFavorite";
import { setDestination } from "../dataManagement/slices/navSlice";

const NavigateCard = () => {
  const actionDispatcher = useDispatch();
  const mapNavigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>
        Where do you want to go ?
      </Text>

      <View>
        <View>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            fetchDetails={true}
            onPress={(data, details = null) => {
              actionDispatcher(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              mapNavigation.navigate("RideOptionsCard");
            }}
            minLength={2}
            returnKeyType={"search"}
            placeholder="Where To?"
            query={{
              key: GOOGLE_MAPS_APIsKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={100}
            enablePoweredByContainer={false}
          />
        </View>
        <NavFavorite />
      </View>

      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tw`flex flex-row bg-black w-24 px-4 py-3   justify-between rounded-full`}
          onPress={() => mapNavigation.navigate("RideOptionsCard") }
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row  w-24 px-4 py-3 justify-between`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
    paddingTop: 20,
  },
  textInput: {
    backgroundColor: "#EBECF0",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
export default NavigateCard;
