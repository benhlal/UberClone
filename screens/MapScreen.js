import { useNavigation } from "@react-navigation/core";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import NavigateCard from "./NavigateCard";
import RideOptionsCard from "./RideOptionsCard";

const MapScreen = () => {
  const MapStack = createStackNavigator();

  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={tw`bg-gray-100  absolute top-16 left-8 z-50  p-3 rounded-full shadow-lg`}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <MapStack.Navigator>
          <MapStack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <MapStack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </MapStack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
