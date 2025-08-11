import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import * as Location from "expo-location";
import { getMapPreview } from "@/util/location";
import { useNavigation, useRoute, useIsFocused} from "@react-navigation/native";

export default function LocationPicker() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const route = useRoute();
  const isFocused = useIsFocused();
  type RouteParams = {
    pickedLat?: number;
    pickedLng?: number;
  };
  
  useEffect(() => {
    if (!isFocused || !route.params) return;
    const mapPickedLocation = route.params as RouteParams;
    
    if (mapPickedLocation?.pickedLat && mapPickedLocation?.pickedLng) {
      setLocation({
        coords: {
          latitude: mapPickedLocation.pickedLat,
          longitude: mapPickedLocation.pickedLng,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      });
    }
  }, [route, isFocused]);

  const navigation = useNavigation();
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  function getLocationHandler() {
    getCurrentLocation();
  }

  function pickOnMapHandler() {
    console.log("Picking on map...");
    navigation.navigate("Map" as never);
  }

  let mapPreview = <Text>No location picked yet.</Text>;
  if (location) {
    mapPreview = <Image source={{ uri: getMapPreview(location.coords.latitude, location.coords.longitude) }} style={styles.mapImage} />;
  }
  return (
    <View>
      <View style={styles.mapPreview}>
        {mapPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location-outline" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
        {errorMsg && <Text>{errorMsg}</Text>}
        {location && <Text>Location: {JSON.stringify(location)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    color: Colors.primary700,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
