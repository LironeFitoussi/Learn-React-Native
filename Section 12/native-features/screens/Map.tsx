import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { useLayoutEffect, useState, useCallback } from "react";
import { NavigationProp } from "@react-navigation/native";
import { Alert, Button } from "react-native";
import IconButton from "@/components/ui/IconButton";
import { Colors } from "@/constants/colors";
interface MapProps {
  navigation: NavigationProp<any>;
}

export default function Map({ navigation }: MapProps) {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "Please pick a location on the map first."
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    } as never);
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  function selectLocationHandler(event: MapPressEvent) {
    // console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
          title="Picked Location"
        />
      )}
    </MapView>
  );
}
