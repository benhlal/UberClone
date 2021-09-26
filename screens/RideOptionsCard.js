import { useNavigation } from "@react-navigation/core";
import "intl";
import "intl/locale-data/jsonp/fr";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInformation } from "../dataManagement/slices/navSlice";
const data = [
  {
    id: "Uber-S-234",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-234",
    title: "Uber VAN",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },

  {
    id: "Uber-Lux-897",
    title: "Uber Lux",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const RideOptionsCard = () => {
  const navigater = useNavigation();
  const SURGE_CHARGE_RATE = 2;

  const [selected, setSelected] = useState(null);
  const travelTimInfos = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View>
        <TouchableOpacity onPress={()=>navigater.navigate("NavigateCard")}
          style={tw`absolute z-50 top-3 bg-gray-100 left-5 p-3 rounded-full`}
          >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimInfos?.distance?.text}
        </Text>
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center justify-between px-5 ${
              id === selected?.id && "bg-gray-200"
            }`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimInfos?.duration?.text} Travel time </Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(
                (travelTimInfos?.duration?.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View  style={tw`mt-auto border-t  border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
